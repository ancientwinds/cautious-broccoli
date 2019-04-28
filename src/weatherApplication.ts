import "reflect-metadata";
import {inject, injectable} from 'inversify';
import {TYPES} from './types/injectableTypes';
import {IWeatherService} from './interfaces/IWeatherService';
import {Subscription} from 'rxjs';
import {IWeatherInformation} from './interfaces/IWeatherInformation';
import {IOHelper} from './helpers/IOHelper';
import {CorruptedCacheSerializationError} from './errors/corruptedCacheSerializationError';
import {FileNotFoundError} from './errors/fileNotFoundError';
import {LogHelper, ArrayHelper, DateTimeHelper} from './helpers/helpers';
import {IWeatherApplication} from './interfaces/IWeatherApplication';
import {LocationHelper} from './helpers/LocationHelper';
import {ProcessHelper} from './helpers/ProcessHelper';
import chalk from 'chalk';

@injectable()
export class WeatherApplication implements IWeatherApplication {
  private weatherService: IWeatherService;
  private weatherServiceSubscription: Subscription;

  constructor(@inject(TYPES.IWeatherService) weatherService: IWeatherService) {
    this.weatherService = weatherService;

    this.weatherServiceSubscription = this.weatherService.messages.subscribe(
      (message: IWeatherInformation) => { this.displayWeatherInformation(message); },
      (error) => { this.displayError(error) }
    );

    this.validateEnvironmentSettings();
    this.loadCacheFromFile();
  }

  private validateEnvironmentSettings(): void {
    if (!process.env.ACCUWEATHER_API_KEY) {
      LogHelper.Error('Invalid API Key. Please export the accuweather api key in an environment variable named ACCUWEATHER_API_KEY');
      process.exit(0);
    }
  }

  public loadCacheFromFile(): void {
    try {
      const serializedCacheData: string = IOHelper.LoadStringFromFile(`${WeatherApplication.name}.cache.json`);

      this.weatherService.deserializeCache(serializedCacheData)
    } catch(error) {
      switch(error.constructor) {
        case FileNotFoundError: {
          LogHelper.Log('Looks like this is a fresh start as no cache serialization has been found!');
          break;
        }
        case CorruptedCacheSerializationError: {
          LogHelper.Warn('Hum... looks like you cache serialization is corrupted');
          break;
        }
        default: {
          LogHelper.Error(`An unknown error has been thrown when loading the cache serialization: ${JSON.stringify(error)}`);
        }
      }
    }
  }

  public persistCacheToFile(): void {
    try {
      const serializedCacheData: string = this.weatherService.serializeCache();

      IOHelper.SaveStringToFile(`${WeatherApplication.name}.cache.json`, serializedCacheData);
    } catch (error) {
      LogHelper.Error(`An unknown error has been thrown when saving the cache serialization to a file: ${JSON.stringify(error)}`);
    }
  }

  private displayWeatherInformation(weatherResponse: IWeatherInformation): void {
    let message: string[] = [];
    message.push(chalk.bgBlue.white.bold(`${weatherResponse.location.name}`.padEnd(80)));
    message.push(`\tDescription: ${weatherResponse.description}`);
    message.push(`\tLocal date and time: ${DateTimeHelper.FormatDateTime(weatherResponse.location.localDateTime)}.`);
    message.push(`\tLocal observation date and time: ${DateTimeHelper.FormatDateTime(weatherResponse.localObservationDateTime)}.`);
    message.push(`\tCurrent temperature: ${weatherResponse.temperature.metric.value} °C (${weatherResponse.temperature.imperial.value} °F)`);
    message.push(`\tGet more information by visiting ${weatherResponse.link}`);
    message.push('');

    LogHelper.Log(message.join('\n'));
  }

  private displayError(error: Error): void {
    LogHelper.Error(JSON.stringify(error));
  }

  public fetchWeatherInformation(locations: string[]): Promise<void>[] {
    if (locations.length === 0) {
      LogHelper.Error('Wrong number of arguments. You must specify at least 1 location. You can also specify multiple locations separated by comas (\',\')');
      process.exit(0);
    }

    locations = ArrayHelper.RemoveDupplicate(locations);
    locations = LocationHelper.CleanLocations(locations);
    locations = LocationHelper.ExtractGeoCoordinates(locations);

    const locationsPromises: Promise<void>[] = [];
    locations.forEach(
      (location: string) => { 
        locationsPromises.push(this.weatherService.fetchWeatherInformation(location));
      }
    );
    
    return locationsPromises;
  }

  public async run(): Promise<void> {
    LogHelper.Title('Weather Application');

    const args: string[] = ProcessHelper.ParseArguments();

    const locationsPromises: Promise<void>[] = this.fetchWeatherInformation(args);
    await Promise.all(locationsPromises)
      .then(
        () => {
          return Promise.resolve();
        }
      )
      .catch(
        () => {
          return Promise.reject();
        }
      );
  }
}

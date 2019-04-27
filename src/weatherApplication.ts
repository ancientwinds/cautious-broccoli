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
import {textSync} from 'figlet';
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

  private loadCacheFromFile(): void {
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

  private persistCacheToFile(): void {
    try {
      const serializedCacheData: string = this.weatherService.serializeCache();

      IOHelper.SaveStringToFile(`${WeatherApplication.name}.cache.json`, serializedCacheData);
    } catch (error) {
      LogHelper.Error(`An unknown error has been thrown when saving the cache serialization to a file: ${JSON.stringify(error)}`);
    }
  }

  private displayWeatherInformation(weatherResponse: IWeatherInformation): void {
    let message: string[] = [];
    message.push(chalk.bgGreen(`Weather data for: ${weatherResponse.location.name}.`));
    message.push(`\tLocal date and time: ${DateTimeHelper.FormatDateTime(weatherResponse.location.localDateTime)}.`);
    message.push(`\tLocal observation date and time: ${DateTimeHelper.FormatDateTime(weatherResponse.localObservationDateTime)}.`);
    message.push(`\tCurrent temperature: ${weatherResponse.temperature.metric.value} °C (${weatherResponse.temperature.imperial.value} °F)`);
    message.push(`\tGet more information by visiting ${weatherResponse.link}`);

    LogHelper.Log(message.join('\n'));
  }

  private displayError(error: Error): void {
    LogHelper.Error(JSON.stringify(error));
  }

  public fetchWeatherInformation(locations: string[]): void {
    if (locations.length === 0) {
      LogHelper.Error('Wrong number of arguments. You must specify at least 1 location. You can also specify multiple locations separated by comas (\',\')');
      process.exit(0);
    }

    locations = ArrayHelper.RemoveDupplicate(locations);
    locations = LocationHelper.CleanLocations(locations);
    locations = LocationHelper.ExtractGeoCoordinates(locations);

    locations.forEach(
      (location: string) => { 
        this.weatherService.fetchWeatherInformation(location)
          .catch(
            (error) => {
              this.displayError(error);
            }
          );
      }
    )
  }

  public run(): Promise<void> {
    try {
      LogHelper.Log(textSync('Welcome into Weather Service'));

      const args: string[] = ProcessHelper.ParseArguments();

      this.fetchWeatherInformation(args);


    } catch (error) {
      LogHelper.Error(`An unexpected error happened: ${JSON.stringify(error)}`);
    } finally {
      this.persistCacheToFile();
    }

    return Promise.resolve();
  }
}

import 'reflect-metadata';
import {injectable, inject} from 'inversify';
import * as Request from 'request-promise-native';
import {Subject} from 'rxjs';
import {IWeatherService} from '../interfaces/iWeatherService';
import {IWeatherInformation} from '../interfaces/iWeatherInformation';
import {TemperatureUnits} from '../enumerations/temperatureUnits';
import {TYPES} from '../types/injectableTypes';
import {ISimpleCacheService} from '../interfaces/iSimpleCacheService';
import {DateTimeHelper} from '../helpers/helpers';
import {LocationNotFoundError} from '../errors/customErrors';
import {ILocationInformation} from '../interfaces/iLocationInformation';

@injectable()
export class WeatherService implements IWeatherService {
  public readonly messages: Subject<IWeatherInformation> = new Subject<IWeatherInformation>();

  private simpleCacheService: ISimpleCacheService;
  private readonly ACCUWEATHER_API_URL: string = 'https://dataservice.accuweather.com';
  private readonly ACCUWEATHER_API_KEY: string = process.env.ACCUWEATHER_API_KEY || '';

  constructor(@inject(TYPES.ISimpleCacheService) simpleCacheService: ISimpleCacheService) {
    this.simpleCacheService = simpleCacheService;
  }

  public serializeCache(): string {
    return this.simpleCacheService.serialize();
  }

  public deserializeCache(serialization: string): void {
    this.simpleCacheService.deserialize(serialization);
  }

  public async fetchWeatherInformation(location: string): Promise<void> {
    try {
      // TODO: Implement an exponential backoff strategy if failure due to network
      const locationInformation: ILocationInformation = await this.getLocationInformation(location);

      if (locationInformation) {
        await this.getCurrentWeatherInformation(locationInformation)
          .then(
            (currentWeatherInformation) => {
              this.messages.next(currentWeatherInformation);
            }
          )
          .catch(
            (error) => {
              this.messages.error(error);
              return Promise.reject();
            }
          );  
      }
    } catch (error) {
      // TODO: Check error type and handle accordingly
      this.messages.error((error as Error).message);
    }

    return Promise.resolve();
  }

  private async getLocationInformation(location: string): Promise<ILocationInformation> {
    let locationInformation: ILocationInformation = this.simpleCacheService.get(`locationCode:${location}`, 60);

    if (!locationInformation) {
      const getLocationCodeUrl: string = `${this.ACCUWEATHER_API_URL}/locations/v1/search?apikey=${this.ACCUWEATHER_API_KEY}&q=${location}`;

      // TODO: Implement an exponential backoff strategy if failure due to network
      await Request.get(getLocationCodeUrl, {json: true})
        .then(
          (locationApiResponse: any) => {
            if (locationApiResponse.length > 0 && locationApiResponse[0].Key) {
              // TODO: Return more than 1 location or ask the user wich one to return if more than 1
              locationInformation = {
                name: locationApiResponse[0].EnglishName,
                code: locationApiResponse[0].Key,
                localDateTime: DateTimeHelper.GetLocalTimeForOffset(locationApiResponse[0].TimeZone.GmtOffset)
              };

              this.simpleCacheService.set(`locationCode:${location}`, locationInformation);
            } else {
              throw new LocationNotFoundError(location);
            }
          }
        )
        .catch(
          (error) => {
            // TODO: Check error type and handle accordingly
            this.messages.error((error as Error).message);
          }
        );
    }

    return Promise.resolve(locationInformation);
  }

  private async getCurrentWeatherInformation(location: ILocationInformation): Promise<IWeatherInformation> {
    let weatherInformation: IWeatherInformation = this.simpleCacheService.get(`weatherInformation:${location.code}`, 60);

    if (!weatherInformation) {
      const getCurrentWeatherInformationUrl: string = `${this.ACCUWEATHER_API_URL}/currentconditions/v1/${location.code}?apikey=${this.ACCUWEATHER_API_KEY}&q=${location}`;

      await Request.get(getCurrentWeatherInformationUrl, {json: true})
        .then(
          (rawWeatherInformation: any) => {
            if (rawWeatherInformation.length > 0) {
              weatherInformation = {
                location: location,
                localObservationDateTime: rawWeatherInformation[0].EpochTime,
                description: rawWeatherInformation[0].WeatherText,
                temperature: {
                  metric: {
                    value: rawWeatherInformation[0].Temperature.Metric.Value,
                    unit: TemperatureUnits.CELSIUS
                  },
                  imperial: {
                    value: rawWeatherInformation[0].Temperature.Imperial.Value,
                    unit: TemperatureUnits.FAHRENHEIT
                  }
                },
                link: rawWeatherInformation[0].Link
              };

              this.simpleCacheService.set(`weatherInformation:${location.code}`, weatherInformation);
            } else {
              throw new LocationNotFoundError(location.code);
            }
          }
        )
        .catch(
          (error) => {
            // TODO: Build a error handling method to check error type and act accordingly
            return Promise.reject(error);
          }
        );
    }

    return Promise.resolve(weatherInformation);
  }
}

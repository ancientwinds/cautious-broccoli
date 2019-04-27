import 'reflect-metadata';
import {injectable, inject} from "inversify";
import * as Request from 'request-promise-native';
import {Subject} from 'rxjs';
import {IWeatherService} from '../interfaces/IWeatherService';
import {IWeatherInformation} from '../interfaces/IWeatherInformation';
import {TemperatureUnits} from '../enumerations/TemperatureUnits';
import {TYPES} from '../types/injectableTypes';
import {ISimpleCacheService} from '../interfaces/ISimpleCacheService';
import {DateTimeHelper} from '../helpers/helpers';
import {LocationNotFoundError} from '../errors/customErrors';
import {ILocationInformation} from '../interfaces/ILocationInformation';
import {promises} from 'fs';

@injectable()
export class WeatherService implements IWeatherService {
  private simpleCacheService: ISimpleCacheService
  private readonly ACCUWEATHER_API_URL: string = 'https://dataservice.accuweather.com';
  private readonly ACCUWEATHER_API_KEY: string = process.env.ACCUWEATHER_API_KEY || '';

  public readonly messages: Subject<IWeatherInformation> = new Subject<IWeatherInformation>();

  constructor(@inject(TYPES.ISimpleCacheService) simpleCacheService: ISimpleCacheService) {
    this.simpleCacheService = simpleCacheService;
  }

  public async fetchWeatherInformation(location: string): Promise<void> {
    try {
      // TODO: Implement an exponential backoff strategy if failure due to network
      // TODO: If more than 3 failure total, stop processing and end process with message
      let locationInformation: ILocationInformation;
      await this.getLocationInformation(location)
        .then(
          (locationInformationResponse) => {
            locationInformation = locationInformationResponse;
          }
        )
        .catch((error) => {
          this.messages.error(error);
        });
      //const weatherInformation: IWeatherInformation = await this.getCurrentWeatherInformation(locationInformation);

      //this.messages.next(weatherInformation);
    } catch (error) {
      console.log('******************************************************************');
      // TODO: Check error type and handle accordingly
      this.messages.error(error);
    }

    return Promise.resolve();
  }

  private async getLocationInformation(location: string): Promise<ILocationInformation> {
    let locationInformation: ILocationInformation = this.simpleCacheService.get(`locationCode:${location}`, 60);
    if (!locationInformation) {
      const getLocationCodeUrl: string = `${this.ACCUWEATHER_API_URL}/locations/v1/search?apikey=${this.ACCUWEATHER_API_KEY}&q=${location}`;

      await Request.get(getLocationCodeUrl)
        .then(
          (locationApiResponse: any) => {
            if (locationApiResponse.length && locationApiResponse.length > 1 && locationApiResponse[0].Key) {
              // TODO: Return more than 1 location or ask the user wich one to return if more than 1
              this.simpleCacheService.set(`locationCode:${location}`, locationApiResponse[0].Key)
              locationInformation = {
                name: locationApiResponse[0].EnglishName,
                code: locationApiResponse[0].Key,
                localDateTime: DateTimeHelper.GetLocalTimeForOffset(locationApiResponse[0].TimeZone.GmtOffset)
              };
            } else {
              throw new LocationNotFoundError(location);
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

    return Promise.resolve(locationInformation);
  }

  private async getCurrentWeatherInformation(location: ILocationInformation): Promise<IWeatherInformation> {
    let weatherInformation = this.simpleCacheService.get(`weatherInformation:${location.code}`, 60);
    if (!weatherInformation) {
      const getCurrentWeatherInformationUrl: string = `${this.ACCUWEATHER_API_URL}/currentconditions/v1/${location.code}?apikey=${this.ACCUWEATHER_API_KEY}&q=${location}`;

      await Request.get(getCurrentWeatherInformationUrl)
        .then(
          (rawWeatherInformation: any) => {
            if (rawWeatherInformation.length && rawWeatherInformation.length > 1) {
              const weatherInformation: IWeatherInformation = {
                location: location,
                localObservationDateTime: rawWeatherInformation[0].EpochTime,
                temperature: {
                  metric: {
                    value: rawWeatherInformation[0].Temperature.Metric,
                    unit: TemperatureUnits.CELSIUS
                  },
                  imperial: {
                    value: rawWeatherInformation[0].Temperature.Imperial,
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

  public serializeCache(): string {
    return this.simpleCacheService.serialize();
  }

  public deserializeCache(serialization: string): void {
    this.simpleCacheService.deserialize(serialization);
  }
}

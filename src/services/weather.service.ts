import 'reflect-metadata';
import {injectable} from "inversify";
import {IWeatherService} from '../interfaces/IWeatherService';
import {IWeatherInformation} from '../interfaces/IWeatherInformation';
import {Subject} from 'rxjs';
import {TemperatureUnits} from '../enumerations/TemperatureUnits';
import {LocationNotFoundError, ExternalAPINotAvailableError} from '../errors/customErrors';

@injectable()
export class WeatherService implements IWeatherService {
  public readonly messages: Subject<IWeatherInformation> = new Subject<IWeatherInformation>();

  constructor() {}

  public fetchWeatherInformation(location: string): void {
    try {
      // TODO: Fetch for real from accuwweather
      // TODO: Implement an exponential backoff strategy if failure due to network
      // TODO: Send error if location is not found
      // TODO: If more than 3 failure total, stop processing and end process with message
      // TODO: Implement a cache
      const weatherInformation: IWeatherInformation = {
        localDateTime: 0,
        localTimezone: -5,
        localObservationDateTime: 0,
        temperature: {
          metric: {
            value: 0,
            unit: TemperatureUnits.CELSIUS
          },
          imperial: {
            value: 0,
            unit: TemperatureUnits.FAHRENHEIT
          }
        },
        link: ''
      };

      this.messages.next(weatherInformation);
    } catch (error) {
      this.messages.error(error);
    }
  }
}

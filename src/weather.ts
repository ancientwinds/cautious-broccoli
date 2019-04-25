import {inject} from 'inversify';
import {TYPES} from './types/injectableTypes';
import {IWeatherService} from './interfaces/IWeatherService';
import {Subscription} from 'rxjs';
import {IWeatherInformation} from './interfaces/IWeatherInformation';

class WeatherApplication {
  private weatherService: IWeatherService;
  private weatherServiceSubscription: Subscription;

  constructor(@inject(TYPES.WeatherService) weatherService: IWeatherService) {
    this.weatherService = weatherService;

    this.weatherServiceSubscription = this.weatherService.messages.subscribe(
        (message: IWeatherInformation) => { this.displayWeatherInformation(message); },
        (error) => { this.displayError(error) }
    );
  }

  private displayWeatherInformation(weatherResponse: IWeatherInformation): void {
    // TODO: Display message
  }

  private displayError(error: Error): void {
    // TODO: Display error, witch chalk to color it red
  }

  public fetchWeatherInformation(locations: string[]): void {
    locations.forEach(
      (location: string) => this.weatherService.fetchWeatherInformation(location)
    )
  }
}

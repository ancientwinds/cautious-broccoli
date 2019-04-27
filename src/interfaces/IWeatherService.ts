import {Subject} from 'rxjs';
import {IWeatherInformation} from './IWeatherInformation';

export interface IWeatherService {
  messages: Subject<IWeatherInformation>;
  fetchWeatherInformation(location: string): Promise<void>;
  serializeCache(): string;
  deserializeCache(serialization: string): void;
}

import {Container} from 'inversify';
import {TYPES} from './types/injectableTypes';
import {ISimpleCacheService} from './interfaces/iSimpleCacheService';
import {SimpleCacheService} from './services/simpleCache.service';
import {WeatherService} from './services/weather.service';
import {IWeatherService} from './interfaces/iWeatherService';
import {IWeatherApplication} from './interfaces/iWeatherApplication';
import {WeatherApplication} from './weatherApplication';

const container = new Container();

container.bind<ISimpleCacheService>(TYPES.ISimpleCacheService).to(SimpleCacheService);
container.bind<IWeatherService>(TYPES.IWeatherService).to(WeatherService);
container.bind<IWeatherApplication>(TYPES.IWeatherApplication).to(WeatherApplication);

export default container;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var injectableTypes_1 = require("./types/injectableTypes");
var simpleCache_service_1 = require("./services/simpleCache.service");
var weather_service_1 = require("./services/weather.service");
var weatherApplication_1 = require("./weatherApplication");
var container = new inversify_1.Container();
container.bind(injectableTypes_1.TYPES.ISimpleCacheService).to(simpleCache_service_1.SimpleCacheService);
container.bind(injectableTypes_1.TYPES.IWeatherService).to(weather_service_1.WeatherService);
container.bind(injectableTypes_1.TYPES.IWeatherApplication).to(weatherApplication_1.WeatherApplication);
exports.default = container;
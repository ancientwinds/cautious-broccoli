"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inversify_1 = require("inversify");
var injectableTypes_1 = require("./types/injectableTypes");
var IOHelper_1 = require("./helpers/IOHelper");
var corruptedCacheSerializationError_1 = require("./errors/corruptedCacheSerializationError");
var fileNotFoundError_1 = require("./errors/fileNotFoundError");
var helpers_1 = require("./helpers/helpers");
var figlet_1 = require("figlet");
var LocationHelper_1 = require("./helpers/LocationHelper");
var ProcessHelper_1 = require("./helpers/ProcessHelper");
var chalk_1 = __importDefault(require("chalk"));
var WeatherApplication = /** @class */ (function () {
    function WeatherApplication(weatherService) {
        var _this = this;
        this.weatherService = weatherService;
        this.weatherServiceSubscription = this.weatherService.messages.subscribe(function (message) { _this.displayWeatherInformation(message); }, function (error) { _this.displayError(error); });
        this.validateEnvironmentSettings();
        this.loadCacheFromFile();
    }
    WeatherApplication_1 = WeatherApplication;
    WeatherApplication.prototype.validateEnvironmentSettings = function () {
        if (!process.env.ACCUWEATHER_API_KEY) {
            helpers_1.LogHelper.Error('Invalid API Key. Please export the accuweather api key in an environment variable named ACCUWEATHER_API_KEY');
            process.exit(0);
        }
    };
    WeatherApplication.prototype.loadCacheFromFile = function () {
        try {
            var serializedCacheData = IOHelper_1.IOHelper.LoadStringFromFile(WeatherApplication_1.name + ".cache.json");
            this.weatherService.deserializeCache(serializedCacheData);
        }
        catch (error) {
            switch (error.constructor) {
                case fileNotFoundError_1.FileNotFoundError: {
                    helpers_1.LogHelper.Log('Looks like this is a fresh start as no cache serialization has been found!');
                    break;
                }
                case corruptedCacheSerializationError_1.CorruptedCacheSerializationError: {
                    helpers_1.LogHelper.Warn('Hum... looks like you cache serialization is corrupted');
                    break;
                }
                default: {
                    helpers_1.LogHelper.Error("An unknown error has been thrown when loading the cache serialization: " + JSON.stringify(error));
                }
            }
        }
    };
    WeatherApplication.prototype.persistCacheToFile = function () {
        try {
            var serializedCacheData = this.weatherService.serializeCache();
            IOHelper_1.IOHelper.SaveStringToFile(WeatherApplication_1.name + ".cache.json", serializedCacheData);
        }
        catch (error) {
            helpers_1.LogHelper.Error("An unknown error has been thrown when saving the cache serialization to a file: " + JSON.stringify(error));
        }
    };
    WeatherApplication.prototype.displayWeatherInformation = function (weatherResponse) {
        var message = [];
        message.push(chalk_1.default.bgGreen("Weather data for: " + weatherResponse.location.name + "."));
        message.push("\tLocal date and time: " + helpers_1.DateTimeHelper.FormatDateTime(weatherResponse.location.localDateTime) + ".");
        message.push("\tLocal observation date and time: " + helpers_1.DateTimeHelper.FormatDateTime(weatherResponse.localObservationDateTime) + ".");
        message.push("\tCurrent temperature: " + weatherResponse.temperature.metric.value + " \u00B0C (" + weatherResponse.temperature.imperial.value + " \u00B0F)");
        message.push("\tGet more information by visiting " + weatherResponse.link);
        helpers_1.LogHelper.Log(message.join('\n'));
    };
    WeatherApplication.prototype.displayError = function (error) {
        helpers_1.LogHelper.Error(JSON.stringify(error));
    };
    WeatherApplication.prototype.fetchWeatherInformation = function (locations) {
        var _this = this;
        if (locations.length === 0) {
            helpers_1.LogHelper.Error('Wrong number of arguments. You must specify at least 1 location. You can also specify multiple locations separated by comas (\',\')');
            process.exit(0);
        }
        locations = helpers_1.ArrayHelper.RemoveDupplicate(locations);
        locations = LocationHelper_1.LocationHelper.CleanLocations(locations);
        locations = LocationHelper_1.LocationHelper.ExtractGeoCoordinates(locations);
        locations.forEach(function (location) {
            _this.weatherService.fetchWeatherInformation(location)
                .catch(function (error) {
                _this.displayError(error);
            });
        });
    };
    WeatherApplication.prototype.run = function () {
        try {
            helpers_1.LogHelper.Log(figlet_1.textSync('Welcome into Weather Service'));
            var args = ProcessHelper_1.ProcessHelper.ParseArguments();
            this.fetchWeatherInformation(args);
        }
        catch (error) {
            helpers_1.LogHelper.Error("An unexpected error happened: " + JSON.stringify(error));
        }
        finally {
            this.persistCacheToFile();
        }
        return Promise.resolve();
    };
    var WeatherApplication_1;
    WeatherApplication = WeatherApplication_1 = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(injectableTypes_1.TYPES.IWeatherService)),
        __metadata("design:paramtypes", [Object])
    ], WeatherApplication);
    return WeatherApplication;
}());
exports.WeatherApplication = WeatherApplication;

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
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inversify_1 = require("inversify");
var rxjs_1 = require("rxjs");
var TemperatureUnits_1 = require("../enumerations/TemperatureUnits");
var WeatherService = /** @class */ (function () {
    function WeatherService() {
        this.messages = new rxjs_1.Subject();
    }
    WeatherService.prototype.fetchWeatherInformation = function (location) {
        try {
            // TODO: Fetch for real from accuwweather
            var weatherInformation = {
                localDateTime: 0,
                localTimezone: -5,
                localObservationDateTime: 0,
                temperature: {
                    metric: {
                        value: 0,
                        unit: TemperatureUnits_1.TemperatureUnits.CELSIUS
                    },
                    imperial: {
                        value: 0,
                        unit: TemperatureUnits_1.TemperatureUnits.FAHRENHEIT
                    }
                },
                link: ''
            };
            this.messages.next(weatherInformation);
        }
        catch (error) {
            this.messages.error(error);
        }
    };
    WeatherService = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], WeatherService);
    return WeatherService;
}());
exports.WeatherService = WeatherService;

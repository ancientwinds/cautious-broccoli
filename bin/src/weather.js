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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var injectableTypes_1 = require("./types/injectableTypes");
var WeatherApplication = /** @class */ (function () {
    function WeatherApplication(weatherService) {
        var _this = this;
        this.weatherService = weatherService;
        this.weatherServiceSubscription = this.weatherService.messages.subscribe(function (message) { _this.displayWeatherInformation(message); }, function (error) { _this.displayError(error); });
    }
    WeatherApplication.prototype.displayWeatherInformation = function (weatherResponse) {
        // TODO: Display message
    };
    WeatherApplication.prototype.displayError = function (error) {
        // TODO: Display error, witch chalk to color it red
    };
    WeatherApplication.prototype.fetchWeatherInformation = function (locations) {
        var _this = this;
        locations.forEach(function (location) { return _this.weatherService.fetchWeatherInformation(location); });
    };
    WeatherApplication = __decorate([
        __param(0, inversify_1.inject(injectableTypes_1.TYPES.WeatherService)),
        __metadata("design:paramtypes", [Object])
    ], WeatherApplication);
    return WeatherApplication;
}());

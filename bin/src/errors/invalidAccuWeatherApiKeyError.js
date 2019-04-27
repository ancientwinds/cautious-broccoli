"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var InvalidAccuWeatherApiKeyError = /** @class */ (function (_super) {
    __extends(InvalidAccuWeatherApiKeyError, _super);
    function InvalidAccuWeatherApiKeyError(location) {
        var _this = _super.call(this, 'InvalidAccuWeatherApiKeyError') || this;
        _this.message = "The provided AccuWeather API key failed to authenticate or is not valid. Make sure you have an environment variable named ACCUWEATHER_API_KEY containing a valid api key.";
        return _this;
    }
    return InvalidAccuWeatherApiKeyError;
}(Error));
exports.InvalidAccuWeatherApiKeyError = InvalidAccuWeatherApiKeyError;

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inversify_1 = require("inversify");
var Request = __importStar(require("request-promise-native"));
var rxjs_1 = require("rxjs");
var TemperatureUnits_1 = require("../enumerations/TemperatureUnits");
var injectableTypes_1 = require("../types/injectableTypes");
var helpers_1 = require("../helpers/helpers");
var customErrors_1 = require("../errors/customErrors");
var WeatherService = /** @class */ (function () {
    function WeatherService(simpleCacheService) {
        this.ACCUWEATHER_API_URL = 'https://dataservice.accuweather.com';
        this.ACCUWEATHER_API_KEY = process.env.ACCUWEATHER_API_KEY || '';
        this.messages = new rxjs_1.Subject();
        this.simpleCacheService = simpleCacheService;
    }
    WeatherService.prototype.fetchWeatherInformation = function (location) {
        return __awaiter(this, void 0, void 0, function () {
            var locationInformation_1, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getLocationInformation(location)
                                .then(function (locationInformationResponse) {
                                locationInformation_1 = locationInformationResponse;
                            })
                                .catch(function (error) {
                                _this.messages.error(error);
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log('******************************************************************');
                        // TODO: Check error type and handle accordingly
                        this.messages.error(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, Promise.resolve()];
                }
            });
        });
    };
    WeatherService.prototype.getLocationInformation = function (location) {
        return __awaiter(this, void 0, void 0, function () {
            var locationInformation, getLocationCodeUrl;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        locationInformation = this.simpleCacheService.get("locationCode:" + location, 60);
                        if (!!locationInformation) return [3 /*break*/, 2];
                        getLocationCodeUrl = this.ACCUWEATHER_API_URL + "/locations/v1/search?apikey=" + this.ACCUWEATHER_API_KEY + "&q=" + location;
                        return [4 /*yield*/, Request.get(getLocationCodeUrl)
                                .then(function (locationApiResponse) {
                                if (locationApiResponse.length && locationApiResponse.length > 1 && locationApiResponse[0].Key) {
                                    // TODO: Return more than 1 location or ask the user wich one to return if more than 1
                                    _this.simpleCacheService.set("locationCode:" + location, locationApiResponse[0].Key);
                                    locationInformation = {
                                        name: locationApiResponse[0].EnglishName,
                                        code: locationApiResponse[0].Key,
                                        localDateTime: helpers_1.DateTimeHelper.GetLocalTimeForOffset(locationApiResponse[0].TimeZone.GmtOffset)
                                    };
                                }
                                else {
                                    throw new customErrors_1.LocationNotFoundError(location);
                                }
                            })
                                .catch(function (error) {
                                // TODO: Build a error handling method to check error type and act accordingly
                                return Promise.reject(error);
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, Promise.resolve(locationInformation)];
                }
            });
        });
    };
    WeatherService.prototype.getCurrentWeatherInformation = function (location) {
        return __awaiter(this, void 0, void 0, function () {
            var weatherInformation, getCurrentWeatherInformationUrl;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        weatherInformation = this.simpleCacheService.get("weatherInformation:" + location.code, 60);
                        if (!!weatherInformation) return [3 /*break*/, 2];
                        getCurrentWeatherInformationUrl = this.ACCUWEATHER_API_URL + "/currentconditions/v1/" + location.code + "?apikey=" + this.ACCUWEATHER_API_KEY + "&q=" + location;
                        return [4 /*yield*/, Request.get(getCurrentWeatherInformationUrl)
                                .then(function (rawWeatherInformation) {
                                if (rawWeatherInformation.length && rawWeatherInformation.length > 1) {
                                    var weatherInformation_1 = {
                                        location: location,
                                        localObservationDateTime: rawWeatherInformation[0].EpochTime,
                                        temperature: {
                                            metric: {
                                                value: rawWeatherInformation[0].Temperature.Metric,
                                                unit: TemperatureUnits_1.TemperatureUnits.CELSIUS
                                            },
                                            imperial: {
                                                value: rawWeatherInformation[0].Temperature.Imperial,
                                                unit: TemperatureUnits_1.TemperatureUnits.FAHRENHEIT
                                            }
                                        },
                                        link: rawWeatherInformation[0].Link
                                    };
                                    _this.simpleCacheService.set("weatherInformation:" + location.code, weatherInformation_1);
                                }
                                else {
                                    throw new customErrors_1.LocationNotFoundError(location.code);
                                }
                            })
                                .catch(function (error) {
                                // TODO: Build a error handling method to check error type and act accordingly
                                return Promise.reject(error);
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, Promise.resolve(weatherInformation)];
                }
            });
        });
    };
    WeatherService.prototype.serializeCache = function () {
        return this.simpleCacheService.serialize();
    };
    WeatherService.prototype.deserializeCache = function (serialization) {
        this.simpleCacheService.deserialize(serialization);
    };
    WeatherService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(injectableTypes_1.TYPES.ISimpleCacheService)),
        __metadata("design:paramtypes", [Object])
    ], WeatherService);
    return WeatherService;
}());
exports.WeatherService = WeatherService;

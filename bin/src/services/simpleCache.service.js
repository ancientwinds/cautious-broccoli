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
var corruptedCacheSerializationError_1 = require("../errors/corruptedCacheSerializationError");
var SimpleCacheService = /** @class */ (function () {
    function SimpleCacheService() {
        this.cachedItems = {};
    }
    SimpleCacheService.prototype.set = function (key, item) {
        var cacheElement = {
            'timestamp': new Date().getTime(),
            'item': item
        };
        this.cachedItems[key] = cacheElement;
    };
    SimpleCacheService.prototype.get = function (key, maximumAgeInMinutes) {
        if (maximumAgeInMinutes === void 0) { maximumAgeInMinutes = 5; }
        if (!Object.keys(this.cachedItems).includes(key)) {
            return null;
        }
        var age = new Date().getTime() - this.cachedItems[key].timestamp;
        if (age > maximumAgeInMinutes * 60 * 1000) {
            this.removeByKey(key);
            return null;
        }
        return this.cachedItems[key];
    };
    SimpleCacheService.prototype.removeByKey = function (key) {
        delete this.cachedItems[key];
    };
    SimpleCacheService.prototype.serialize = function () {
        return JSON.stringify(this.cachedItems);
    };
    SimpleCacheService.prototype.deserialize = function (serialization) {
        try {
            this.cachedItems = JSON.parse(serialization);
        }
        catch (error) {
            throw new corruptedCacheSerializationError_1.CorruptedCacheSerializationError();
        }
    };
    SimpleCacheService = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], SimpleCacheService);
    return SimpleCacheService;
}());
exports.SimpleCacheService = SimpleCacheService;

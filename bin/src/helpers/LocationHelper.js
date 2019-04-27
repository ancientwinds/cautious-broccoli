"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringHelper_1 = require("./StringHelper");
var NumberHelper_1 = require("./NumberHelper");
var LocationHelper = /** @class */ (function () {
    function LocationHelper() {
    }
    LocationHelper.CleanLocations = function (locations) {
        return locations.map(function (location) {
            location = location.trim();
            location = StringHelper_1.StringHelper.RemoveSpecificTrailingCharacters(location, ',');
            return location;
        });
    };
    LocationHelper.SplitEntriesIfNotGeoCoordinates = function (locations) {
        var newLocations = [];
        var splitEntryIfRequired = function (location) {
            var splitLocations = location.split(',');
            if (splitLocations.length === 2 && LocationHelper.IsValidGeoCoordinates(splitLocations[0], splitLocations[1])) {
                newLocations.push(splitLocations[0]);
                newLocations.push(splitLocations[1]);
            }
            else {
                newLocations.push(location);
            }
        };
        locations.forEach(function (location) { splitEntryIfRequired(location); });
        return newLocations;
    };
    LocationHelper.ExtractGeoCoordinates = function (locations) {
        var newLocations = [];
        for (var index = 0; index < locations.length; index++) {
            var hasMoreLocations = (index + 1) !== locations.length;
            if (LocationHelper.IsValidLatitude(locations[index]) && hasMoreLocations && LocationHelper.IsValidLongitude(locations[index + 1])) {
                newLocations.push(locations[index] + "," + locations[index + 1]);
                index += 1;
            }
            else {
                newLocations.push(locations[index]);
            }
        }
        return newLocations;
    };
    LocationHelper.IsValidGeoCoordinates = function (value1, value2) {
        if (LocationHelper.IsValidLatitude(value1) && LocationHelper.IsValidLongitude(value2)) {
            return true;
        }
        return false;
    };
    LocationHelper.IsValidLatitude = function (value) {
        var isNumber = NumberHelper_1.NumberHelper.IsNumber(value);
        var valueAsNumber = Number.parseFloat(value);
        return (isNumber
            && (valueAsNumber >= -90)
            && (valueAsNumber <= 90));
    };
    LocationHelper.IsValidLongitude = function (value) {
        var isNumber = NumberHelper_1.NumberHelper.IsNumber(value);
        var valueAsNumber = Number.parseFloat(value);
        return (isNumber
            && (valueAsNumber >= -180)
            && (valueAsNumber <= 180));
    };
    return LocationHelper;
}());
exports.LocationHelper = LocationHelper;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var LocationHelper_1 = require("../../../src/helpers/LocationHelper");
describe('LocationHelper', function () {
    var testLocations = ['city1', 'city2,', 'city3 ', 'city4, ', '33.4567,102.2222', '84', '123'];
    describe('CleanLocations', function () {
        it('Should effectively remove training spaces', function () {
            var cleanedLocations = LocationHelper_1.LocationHelper.CleanLocations(testLocations);
            chai_1.expect(cleanedLocations[0]).to.equal('city1');
            chai_1.expect(cleanedLocations[1]).to.equal('city2');
            chai_1.expect(cleanedLocations[2]).to.equal('city3');
            chai_1.expect(cleanedLocations[3]).to.equal('city4');
            chai_1.expect(cleanedLocations[4]).to.equal('33.4567,102.2222');
        });
    });
    describe('IsValidLatitude', function () {
        it('Should return true if valid latitudes', function () {
            chai_1.expect(LocationHelper_1.LocationHelper.IsValidLatitude('-90')).to.equal(true);
            chai_1.expect(LocationHelper_1.LocationHelper.IsValidLatitude('0')).to.equal(true);
            chai_1.expect(LocationHelper_1.LocationHelper.IsValidLatitude('90')).to.equal(true);
        });
        it('Should return false if invalid latitudes', function () {
            chai_1.expect(LocationHelper_1.LocationHelper.IsValidLatitude('-91')).to.equal(false);
            chai_1.expect(LocationHelper_1.LocationHelper.IsValidLatitude('91')).to.equal(false);
            chai_1.expect(LocationHelper_1.LocationHelper.IsValidLatitude('abc')).to.equal(false);
            chai_1.expect(LocationHelper_1.LocationHelper.IsValidLatitude('90abc')).to.equal(false);
            chai_1.expect(LocationHelper_1.LocationHelper.IsValidLatitude('90,180')).to.equal(false);
        });
    });
    describe('IsValidLongitude', function () {
        it('Should return true if valid longitudes', function () {
            chai_1.expect(LocationHelper_1.LocationHelper.IsValidLongitude('-180')).to.equal(true);
            chai_1.expect(LocationHelper_1.LocationHelper.IsValidLongitude('0')).to.equal(true);
            chai_1.expect(LocationHelper_1.LocationHelper.IsValidLongitude('180')).to.equal(true);
        });
        it('Should return false if invalid longitudes', function () {
            chai_1.expect(LocationHelper_1.LocationHelper.IsValidLongitude('-181')).to.equal(false);
            chai_1.expect(LocationHelper_1.LocationHelper.IsValidLongitude('181')).to.equal(false);
            chai_1.expect(LocationHelper_1.LocationHelper.IsValidLongitude('abc')).to.equal(false);
            chai_1.expect(LocationHelper_1.LocationHelper.IsValidLongitude('180abc')).to.equal(false);
            chai_1.expect(LocationHelper_1.LocationHelper.IsValidLatitude('90,180')).to.equal(false);
        });
    });
    describe('IsValidGeoCoordinates', function () {
        it('Should return true if valid geo-coordinates', function () {
            chai_1.expect(LocationHelper_1.LocationHelper.IsValidGeoCoordinates('-28.99', '105.09')).to.equal(true);
        });
        it('Should return false if invalid geo-coordinates', function () {
            chai_1.expect(LocationHelper_1.LocationHelper.IsValidGeoCoordinates('-208.99', '105.09')).to.equal(false);
            chai_1.expect(LocationHelper_1.LocationHelper.IsValidGeoCoordinates('-28.99', '1005.09')).to.equal(false);
            chai_1.expect(LocationHelper_1.LocationHelper.IsValidGeoCoordinates('abc', '1005.09')).to.equal(false);
        });
    });
    describe('ExtractGeoCoordinates', function () {
        it('Should successfully extract geocoordinates', function () {
            var newLocations = LocationHelper_1.LocationHelper.ExtractGeoCoordinates(testLocations);
            chai_1.expect(newLocations[4]).to.equal('33.4567,102.2222');
            chai_1.expect(newLocations[5]).to.equal('84,123');
        });
    });
});

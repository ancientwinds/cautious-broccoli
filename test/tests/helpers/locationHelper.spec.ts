import {expect} from 'chai';
import {LocationHelper} from '../../../src/helpers/locationHelper';

describe('LocationHelper', () => {
  const testLocations: string[] = ['city1', 'city2,', 'city3 ', 'city4, ', '33.4567,102.2222', '84', '123'];

  describe('CleanLocations', () => {
    it('Should effectively remove training spaces', () => {
      const cleanedLocations: string[] = LocationHelper.CleanLocations(testLocations);

      expect(cleanedLocations[0]).to.equal('city1');
      expect(cleanedLocations[1]).to.equal('city2');
      expect(cleanedLocations[2]).to.equal('city3');
      expect(cleanedLocations[3]).to.equal('city4');
      expect(cleanedLocations[4]).to.equal('33.4567,102.2222');
    });
  });

  describe('IsValidLatitude', () => {
    it('Should return true if valid latitudes', () => {
        expect(LocationHelper.IsValidLatitude('-90')).to.equal(true);
        expect(LocationHelper.IsValidLatitude('0')).to.equal(true);
        expect(LocationHelper.IsValidLatitude('90')).to.equal(true);
    });

    it('Should return false if invalid latitudes', () => {
        expect(LocationHelper.IsValidLatitude('-91')).to.equal(false);
        expect(LocationHelper.IsValidLatitude('91')).to.equal(false);
        expect(LocationHelper.IsValidLatitude('abc')).to.equal(false);
        expect(LocationHelper.IsValidLatitude('90abc')).to.equal(false);
        expect(LocationHelper.IsValidLatitude('90,180')).to.equal(false);
    });
  });

  describe('IsValidLongitude', () => {
    it('Should return true if valid longitudes', () => {
        expect(LocationHelper.IsValidLongitude('-180')).to.equal(true);
        expect(LocationHelper.IsValidLongitude('0')).to.equal(true);
        expect(LocationHelper.IsValidLongitude('180')).to.equal(true);
    });

    it('Should return false if invalid longitudes', () => {
        expect(LocationHelper.IsValidLongitude('-181')).to.equal(false);
        expect(LocationHelper.IsValidLongitude('181')).to.equal(false);
        expect(LocationHelper.IsValidLongitude('abc')).to.equal(false);
        expect(LocationHelper.IsValidLongitude('180abc')).to.equal(false);
        expect(LocationHelper.IsValidLatitude('90,180')).to.equal(false);
    });
  });

  describe('IsValidGeoCoordinates', () => {
    it('Should return true if valid geo-coordinates', () => {
        expect(LocationHelper.IsValidGeoCoordinates('-28.99', '105.09')).to.equal(true);
    });

    it('Should return false if invalid geo-coordinates', () => {
        expect(LocationHelper.IsValidGeoCoordinates('-208.99', '105.09')).to.equal(false);
        expect(LocationHelper.IsValidGeoCoordinates('-28.99', '1005.09')).to.equal(false);
        expect(LocationHelper.IsValidGeoCoordinates('abc', '1005.09')).to.equal(false);
    });
  });

  describe('ExtractGeoCoordinates', () => {
    it('Should successfully extract geocoordinates', () => {
        const newLocations: string[] = LocationHelper.ExtractGeoCoordinates(testLocations);
        
        expect(newLocations[4]).to.equal('33.4567,102.2222');
        expect(newLocations[5]).to.equal('84,123');
    });
  });
});

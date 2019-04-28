import {StringHelper} from './stringHelper';
import {NumberHelper} from './numberHelper';

export class LocationHelper {
  public static CleanLocations(locations: string[]): string[] {
    return locations.map(
      (location) => {
        location = location.trim();
        location = StringHelper.RemoveSpecificTrailingCharacters(location, ',');

        return location;
      }
    );
  }

  public static SplitEntriesIfNotGeoCoordinates(locations: string[]): string[] {
    const newLocations: string[] = [];
    
    const splitEntryIfRequired = (location: string) => {
      const splitLocations: string[] = location.split(',');
      if (splitLocations.length === 2 && LocationHelper.IsValidGeoCoordinates(splitLocations[0], splitLocations[1])) {
        newLocations.push(splitLocations[0]);
        newLocations.push(splitLocations[1]);
      } else {
        newLocations.push(location);
      }
    };

    locations.forEach((location) => { splitEntryIfRequired(location); });

    return newLocations;
  }

  public static ExtractGeoCoordinates(locations: string[]): string[] {
      const newLocations: string[] = [];
      
      for(let index = 0; index < locations.length; index++) {
        const hasMoreLocations: boolean = (index + 1) !== locations.length;
        if (LocationHelper.IsValidLatitude(locations[index]) && hasMoreLocations && LocationHelper.IsValidLongitude(locations[index + 1])) {
          newLocations.push(`${locations[index]},${locations[index + 1]}`);
          index += 1;
        } else {
          newLocations.push(locations[index]);
        }
      }

      return newLocations;
  }

  public static  IsValidGeoCoordinates(value1: string, value2: string): boolean {
      if (LocationHelper.IsValidLatitude(value1) && LocationHelper.IsValidLongitude(value2)) {
        return true;
      }

      return false;
  }

  public static IsValidLatitude(value: string): boolean {
    const isNumber: boolean = NumberHelper.IsNumber(value);
    const valueAsNumber: number = Number.parseFloat(value);

    return (
      isNumber
      && (valueAsNumber >= -90)
      && (valueAsNumber <= 90)
    );
  }

  public static IsValidLongitude(value: string): boolean {
    const isNumber: boolean = NumberHelper.IsNumber(value);
    const valueAsNumber: number = Number.parseFloat(value);
    return (
      isNumber
      && (valueAsNumber >= -180)
      && (valueAsNumber <= 180)
    );
  }
}

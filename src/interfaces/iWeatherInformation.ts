import {ITemperatureInfo} from './iTemperatureInfo';
import {ILocationInformation} from './iLocationInformation';

export interface IWeatherInformation {
  location: ILocationInformation;
  localObservationDateTime: number;
  description: string;
  temperature: {
    metric: ITemperatureInfo,
    imperial: ITemperatureInfo
  };
  link: string;
}

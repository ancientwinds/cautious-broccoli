import {ITemperatureInfo} from './ITemperatureInfo';
import {ILocationInformation} from './ILocationInformation';

export interface IWeatherInformation {
  location: ILocationInformation;
  localObservationDateTime: number;
  description: string;
  temperature: {
    metric: ITemperatureInfo,
    imperial: ITemperatureInfo
  }
  link: string
}

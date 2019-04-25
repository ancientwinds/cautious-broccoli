import {ITemperatureInfo} from './ITemperatureInfo';

export interface IWeatherInformation {
  localDateTime: number;
  localObservationDateTime: number;
  localTimezone: number;
  temperature: {
    metric: ITemperatureInfo,
    imperial: ITemperatureInfo
  }
  link: string
}

import {IWeatherApplication} from './interfaces/iWeatherApplication';
import container from './container';
import {TYPES} from './types/injectableTypes';
import {LogHelper} from './helpers/helpers';

const application: IWeatherApplication = container.get<IWeatherApplication>(TYPES.IWeatherApplication);
application.loadCacheFromFile();
application.run()
  .then(
    () => {
      LogHelper.LogEmptyLines(1);
      LogHelper.Goodbye();
      application.persistCacheToFile();
    }
  )
  .catch(
    (error) => {
      LogHelper.Error(`Oups... an unexpected error happened. Please contact the developper. (${JSON.stringify(error)})`);
    }
  );

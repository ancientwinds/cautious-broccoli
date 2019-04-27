import {IWeatherApplication} from './interfaces/IWeatherApplication';
import container from './container';
import {TYPES} from './types/injectableTypes';
import {LogHelper} from './helpers/helpers';

const application: IWeatherApplication = container.get<IWeatherApplication>(TYPES.IWeatherApplication);
application.run()
  .then(
    () => {
      LogHelper.LogEmptyLines(1);
      LogHelper.Goodbye();
      //process.exit(0);
    }
  )
  .catch(
    (error) => {
      LogHelper.Error(`Oups... an unexpected error happened. Please contact the developper. (${JSON.stringify(error)})`);
      process.exit(0);
    }
  );

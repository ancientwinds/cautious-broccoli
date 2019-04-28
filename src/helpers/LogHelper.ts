import chalk from 'chalk';
import {textSync} from 'figlet';

export class LogHelper {
  public static Title(message: string): void {
    const formattedMessage: string = chalk.green(
      textSync('Weather', '4Max')
    );

    console.log(formattedMessage);
    console.log('');
  }

  public static Log(message: string): void {
    console.log(message);
  }

  public static Warn(message: string): void {
    console.log(`${chalk.bgYellow('WARNING: ')} ${message}`);
  }

  public static Error(message: string): void {
    console.log(`${chalk.bgRed('ERROR: ')} ${message}`);
  }

  public static Goodbye(): void {
    console.log(chalk.green.bold('Goodbye! Hope you\'ll get nice weather.'));
    console.log('\n');
  }

  public static LogEmptyLines(numberOfEmptyLines: number): void {
    for (let index = 0; index < numberOfEmptyLines; index++) {
      console.log('\n');
    }
  }
}

import chalk from 'chalk';
import {textSync} from 'figlet';

export class LogHelper {
  public static Title(): void {
    let titleString: string = 'Weather Application';
    titleString = titleString.padStart(48);
    titleString = titleString.padEnd(78);

    const formattedMessage: string = `${chalk.bgGreen(' ')}${chalk.green(titleString)}${chalk.bgGreen(' ')}`;
    const line: string = chalk.bgGreen(''.padStart(80, ' '));
    const emptyLine: string = `${chalk.bgGreen(' ')}${''.padStart(78, ' ')}${chalk.bgGreen(' ')}`;

    console.log(line);
    console.log(emptyLine);
    console.log(formattedMessage);
    console.log(emptyLine);
    console.log(line);
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

import chalk from 'chalk';

export class LogHelper {
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
    console.log(`${chalk.bgBlue.white.bold('Goodbye! Hoping that the weather will be nice on you.')}`);
  }

  public static LogEmptyLines(numberOfEmptyLines: number): void {
    for (let index = 0; index < numberOfEmptyLines; index++) {
      console.log('\n');
    }
  }
}
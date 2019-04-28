import {writeFileSync, readFileSync, existsSync} from 'fs';
import {FileNotFoundError} from '../errors/fileNotFoundError';

export class IOHelper {
  public static SaveStringToFile(filepath: string, stringToSave: string): void {
    writeFileSync(filepath, stringToSave);
  }

  public static LoadStringFromFile(filepath: string): string {
    if (!existsSync(filepath)) {
      throw new FileNotFoundError(filepath);
    }

    return readFileSync(filepath).toString('utf8');
  }

  public static FileExists(filepath: string): boolean {
    return existsSync(filepath);
  }
}

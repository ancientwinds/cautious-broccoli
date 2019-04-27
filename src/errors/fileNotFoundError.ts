export class FileNotFoundError extends Error {
  constructor(filepath: string) {
    super('FileNotFoundError');
    this.message = `Unable to find the file: ${filepath}`;
  }
}

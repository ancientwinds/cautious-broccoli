export class LocationNotFoundError extends Error {
  constructor(location: string) {
    super(`Unable to find the provided location: ${location}`);
    this.name = 'ExceptionNotFoundError'
  }
}

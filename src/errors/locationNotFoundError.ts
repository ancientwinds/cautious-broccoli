export class LocationNotFoundError extends Error {
  constructor(location: string) {
    super('ExceptionNotFoundError');
    this.message = `Unable to find the provided location: ${location}`;
  }
}

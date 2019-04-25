export class ExternalAPINotAvailableError extends Error {
  constructor(location: string) {
    super(`Unable to find the provided location: ${location}`);
    this.name = 'ExceptionNotFoundError'
  }
}

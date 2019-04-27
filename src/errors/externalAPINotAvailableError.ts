export class ExternalAPINotAvailableError extends Error {
  constructor(apiUrl: string) {
    super('ExternalAPINotAvailableError');
    this.message = `Unable to contact the requested api: ${apiUrl}`;
  }
}

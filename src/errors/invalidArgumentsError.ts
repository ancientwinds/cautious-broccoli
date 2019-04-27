export class InvalidArgumentsError extends Error {
  constructor(location: string) {
    super('InvalidArgumentsError');
    this.message = `The arguments provided are not valid. Make sure you specify locations (zip/postal codes, city, lat/long) separated by comas. Also make sure you specify at least one location.`;
  }
}

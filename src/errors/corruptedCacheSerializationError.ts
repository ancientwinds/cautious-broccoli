export class CorruptedCacheSerializationError extends Error {
  constructor() {
    super('CorruptedCacheSerializationError');
    this.message = `Unable to parse cache data serialization.`;
  }
}

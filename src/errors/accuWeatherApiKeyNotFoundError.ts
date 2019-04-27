export class AccuWeatherApiKeyNotFoundError extends Error {
  constructor() {
    super('AccuWeatherApiKeyNotFoundError');
    this.message = `The AccuWeather API key was not found. Make sure you have an environment variable named ACCUWEATHER_API_KEY containing a valid api key.`;
  }
}

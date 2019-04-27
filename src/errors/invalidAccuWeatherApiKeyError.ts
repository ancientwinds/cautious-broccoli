export class InvalidAccuWeatherApiKeyError extends Error {
  constructor(location: string) {
    super('InvalidAccuWeatherApiKeyError');
    this.message = `The provided AccuWeather API key failed to authenticate or is not valid. Make sure you have an environment variable named ACCUWEATHER_API_KEY containing a valid api key.`;
  }
}

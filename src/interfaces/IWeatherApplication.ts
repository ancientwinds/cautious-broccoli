export interface IWeatherApplication {
  run(): Promise<void>;
  loadCacheFromFile(): void;
  persistCacheToFile(): void;
}

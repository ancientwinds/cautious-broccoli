import {Subject} from 'rxjs';

export interface ISimpleCacheService {
  cachedItems: any;

  set(key: string, item: any): void;
  get(key: string, maximumAgeInMinutes: number): any;
  removeByKey(key: string): void;
  serialize(): string;
  deserialize(serialization: string): void;
}

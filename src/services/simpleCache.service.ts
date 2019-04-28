import 'reflect-metadata';
import {injectable} from "inversify";
import {ICacheElement} from '../interfaces/ICacheElement';
import {CorruptedCacheSerializationError} from '../errors/corruptedCacheSerializationError';
import {ISimpleCacheService} from '../interfaces/ISimpleCacheService';

@injectable()
export class SimpleCacheService implements ISimpleCacheService {
  public cachedItems: any = {};

  constructor() {}

  public set(key: string, item: any): void {
    const cacheElement: ICacheElement = {
      'timestamp': new Date().getTime(),
      'item': item
    };

    this.cachedItems[key] = cacheElement;
  }

  public get(key: string, maximumAgeInMinutes: number = 5): any {
    if (!Object.keys(this.cachedItems).includes(key)) {
      return null;
    }

    const age: number = new Date().getTime() - this.cachedItems[key].timestamp;

    if (age > maximumAgeInMinutes * 60 * 1000) {
      this.removeByKey(key);
      return null;
    }

    return (this.cachedItems[key] as ICacheElement).item;
  }

  public removeByKey(key: string): void {
    delete this.cachedItems[key];
  }

  public serialize(): string {
      return JSON.stringify(this.cachedItems);
  }

  public deserialize(serialization: string): void {
    try {
      this.cachedItems = JSON.parse(serialization);
    } catch (error) {
      throw new CorruptedCacheSerializationError();
    }
  }
}

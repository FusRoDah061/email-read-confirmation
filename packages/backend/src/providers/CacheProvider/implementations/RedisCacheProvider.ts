import Redis, { Redis as RedisClient } from 'ioredis';
import CacheProvider, { SaveCacheOptions } from '../models/CacheProvider';

export default class RedisCacheProvider implements CacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(process.env.REDIS_URL);
  }

  async save<T>(
    key: string,
    value: T,
    { ttl }: SaveCacheOptions,
  ): Promise<void> {
    if (ttl) {
      await this.client.setex(key, ttl, JSON.stringify(value));
    } else {
      await this.client.set(key, JSON.stringify(value));
    }
  }

  async recover<T>(key: string, parse = true): Promise<T | null> {
    const value = await this.client.get(key);

    if (value) {
      if (parse) {
        return JSON.parse(value) as T;
      }

      return value as any;
    }

    return null;
  }
}

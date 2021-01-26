export interface SaveCacheOptions {
  ttl: number;
}

export default interface CacheProvider {
  save<T>(key: string, value: T, options?: SaveCacheOptions): Promise<void>;
  recover<T>(key: string, parse?: boolean): Promise<T | null>;
}

import { container } from 'tsyringe';
import RedisCacheProvider from './implementations/RedisCacheProvider';
import CacheProvider from './models/CacheProvider';

container.registerSingleton<CacheProvider>('CacheProvider', RedisCacheProvider);

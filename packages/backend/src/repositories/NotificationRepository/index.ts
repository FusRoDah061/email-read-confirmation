import { container } from 'tsyringe';
import CacheNotificationRepository from './implementations/CacheNotificationRepository';

container.registerSingleton(
  'NotificationRepository',
  CacheNotificationRepository,
);

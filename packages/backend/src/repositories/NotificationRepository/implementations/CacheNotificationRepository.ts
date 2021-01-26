/* eslint-disable import/no-extraneous-dependencies */
import { differenceInSeconds } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';
import Notification from '../../../entities/Notification';
import CacheProvider from '../../../providers/CacheProvider/models/CacheProvider';
import md5 from '../../../utils/md5';
import NotificationRepository, {
  CreateNotificationDTO,
  FindBySenderAndDescriptionDTO,
} from '../models/NotificationRepository';

@injectable()
export default class CacheNotificationRepository
  implements NotificationRepository {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: CacheProvider,
  ) {}

  async create({
    sender,
    description,
    recipient,
    viewCount,
    expiration,
  }: CreateNotificationDTO): Promise<Notification> {
    const notification: Notification = {
      id: uuid(),
      sender,
      description,
      recipient,
      viewCount,
      expiration,
    };

    const hash = md5(`${sender}${description}`);
    const notificationKey = `notification:id:${notification.id}`;
    const uniqueKey = `notification:hash:${hash}`;

    const ttl = Math.abs(
      differenceInSeconds(notification.expiration, new Date()),
    );

    await Promise.all([
      this.cacheProvider.save<Notification>(notificationKey, notification, {
        ttl,
      }),
      this.cacheProvider.save(uniqueKey, notification.id, {
        ttl,
      }),
    ]);

    return notification;
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const key = `notification:id:${notificationId}`;
    const notification = await this.cacheProvider.recover<Notification>(key);

    return notification;
  }

  async findBySenderAndDescription({
    description,
    sender,
  }: FindBySenderAndDescriptionDTO): Promise<Notification | null> {
    const hash = md5(`${sender}${description}`);
    const hashKey = `notification:hash:${hash}`;
    const notificationId = await this.cacheProvider.recover<Notification>(
      hashKey,
    );
    const notificationKey = `notification:id:${notificationId}`;
    const notification = await this.cacheProvider.recover<Notification>(
      notificationKey,
    );

    return notification;
  }

  async update(notification: Notification): Promise<Notification> {
    const key = `notification:id:${notification.id}`;

    const ttl = Math.abs(
      differenceInSeconds(notification.expiration, new Date()),
    );

    await this.cacheProvider.save(key, notification, { ttl });

    return notification;
  }
}

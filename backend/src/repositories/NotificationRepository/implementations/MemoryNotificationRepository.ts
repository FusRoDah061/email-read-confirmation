import { v4 as uuid } from 'uuid';
import Notification from '../../../entities/Notification';
import NotificationRepository, { CreateNotificationDTO } from '../models/NotificationRepository';

export default class MemoryNotificationRepository implements NotificationRepository{
  private notifications: Notification[];

  constructor() {
    this.notifications = [];
  }

  public async create({ sender, description }: CreateNotificationDTO): Promise<Notification> {
    const notification: Notification = {
      id: uuid(),
      sender,
      description,
      viewCount: 0,
    }

    this.notifications.push(notification);

    return notification;
  }

  public async findById(notificationId: string): Promise<Notification | undefined> {
    const notification = this.notifications.find(n => {
      return n.id === notificationId;
    });

    return notification;
  }

}

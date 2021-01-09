import { v4 as uuid } from 'uuid';
import Notification from '../../../entities/Notification';
import NotificationRepository, { CreateNotificationDTO } from '../models/NotificationRepository';

export default class MemoryNotificationRepository implements NotificationRepository{
  private notifications: Notification[];

  constructor() {
    this.notifications = [];
  }

  public create({ sender, description }: CreateNotificationDTO): Notification {
    const notification: Notification = {
      id: uuid(),
      sender,
      description,
      viewCount: 0,
    }

    this.notifications.push(notification);

    return notification;
  }

  public findById(notificationId: string): Notification | undefined {
    const notification = this.notifications.find(n => {
      return n.id === notificationId;
    });

    return notification;
  }

  public save(notification: Notification): Notification {
    const notificationIndex = this.notifications.findIndex(n => {
      return n.id === notification.id;
    });

    if(notificationIndex >= 0) {
      this.notifications[notificationIndex] = {
        ...notification,
      }

      return this.notifications[notificationIndex];
    }

    return notification;
  }

}

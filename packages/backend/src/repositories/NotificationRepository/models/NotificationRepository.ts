import Notification from '../../../entities/Notification';

export interface CreateNotificationDTO {
  sender: string;
  description: string;
}

export default interface NotificationRepository {
  create(data: CreateNotificationDTO): Notification;
  findById(notificationId: string): Notification | undefined;
  save(notification: Notification): Notification;
}

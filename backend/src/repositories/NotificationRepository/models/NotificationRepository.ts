import Notification from '../../../entities/Notification';

export interface CreateNotificationDTO {
  sender: string;
  description: string;
}

export default interface NotificationRepository {
  create(data: CreateNotificationDTO): Promise<Notification>;
  findById(notificationId: string): Promise<Notification | undefined>;
}

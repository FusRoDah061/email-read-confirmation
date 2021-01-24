import Notification from '../../../entities/Notification';

export interface CreateNotificationDTO {
  sender: string;
  description: string;
  viewCount: number;
  expiration: Date;
  recipient?: string;
}

export interface FindBySenderAndDescriptionDTO {
  sender: string;
  description: string;
}

export default interface NotificationRepository {
  create(data: CreateNotificationDTO): Notification;
  findById(notificationId: string): Notification | undefined;
  findBySenderAndDescription(
    data: FindBySenderAndDescriptionDTO,
  ): Notification | undefined;
  save(notification: Notification): Notification;
}

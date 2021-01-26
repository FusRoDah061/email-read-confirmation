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
  create(data: CreateNotificationDTO): Promise<Notification>;
  findById(notificationId: string): Promise<Notification | null>;
  findBySenderAndDescription(
    data: FindBySenderAndDescriptionDTO,
  ): Promise<Notification | null>;
  update(notification: Notification): Promise<Notification>;
}

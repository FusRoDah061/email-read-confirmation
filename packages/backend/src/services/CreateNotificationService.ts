import { inject, injectable } from 'tsyringe';
import { addDays } from 'date-fns';
import Notification from '../entities/Notification';
import NotificationRepository from '../repositories/NotificationRepository/models/NotificationRepository';

interface RequestDTO {
  sender: string;
  description: string;
  recipient?: string;
}

@injectable()
export default class CreateNotificationService {
  constructor(
    @inject('NotificationRepository')
    private notificationRepository: NotificationRepository,
  ) {}

  public execute({ sender, description, recipient }: RequestDTO): Notification {
    const notification = this.notificationRepository.create({
      sender,
      description,
      recipient,
      viewCount: 0,
      expiration: addDays(new Date(), 7),
    });

    return notification;
  }
}

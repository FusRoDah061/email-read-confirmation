import { inject, injectable } from 'tsyringe';
import { addDays } from 'date-fns';
import Notification from '../entities/Notification';
import NotificationRepository from '../repositories/NotificationRepository/models/NotificationRepository';
import AppError from '../error/AppError';

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
    const notificationExists = this.notificationRepository.findBySenderAndDescription(
      { sender, description },
    );

    if (notificationExists) {
      throw new AppError('This notification already exists');
    }

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

import { inject, injectable } from "tsyringe";
import Notification from "../entities/Notification";
import NotificationRepository from "../repositories/NotificationRepository/models/NotificationRepository";

interface RequestDTO {
  sender: string;
  description: string;
}

@injectable()
export default class CreateNotificationService {
  constructor(
    @inject('NotificationRepository')
    private notificationRepository: NotificationRepository,
  ) { }

  public async execute({sender, description}: RequestDTO): Promise<Notification> {
    const notification = await this.notificationRepository.create({
      sender, description
    });

    return notification;
  }
}

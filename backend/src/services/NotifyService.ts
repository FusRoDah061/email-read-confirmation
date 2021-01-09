import path from 'path';
import { inject, injectable } from "tsyringe";
import MailProvider from "../providers/MailProvider/models/MailProvider";
import NotificationRepository from "../repositories/NotificationRepository/models/NotificationRepository";

interface RequestDTO {
  notificationId: string;
  viewerIpAddress: string;
}

@injectable()
export default class NotifyService {
  constructor(
    @inject('NotificationRepository')
    private notificationRepository: NotificationRepository,

    @inject('MailProvider')
    private mailProvider: MailProvider,
  ) { }

  public async execute({ notificationId, viewerIpAddress }: RequestDTO): Promise<string> {
    const notification = this.notificationRepository.findById(notificationId);

    if (notification) {
      console.log('Notification found.');
      notification.viewCount += 1;

      const updatedNotification = this.notificationRepository.save(notification);

      await this.mailProvider.sendMail({
        to: { email: updatedNotification.sender },
        subject: `Your "${updatedNotification.description}" e-mail was just viewed by someone`,
        templateData: {
          file: path.join(__dirname, '..', 'assets', 'templates', 'notification.hbs'),
          variables: {
            viewCount: updatedNotification.viewCount,
            description: updatedNotification.description,
            viewerLocation: viewerIpAddress,
          }
        }
      })
    }
    else {
      console.log('Notification not found.');
    }

    const imagePath = path.join(__dirname, '..', 'assets', 'static', 'transparent.png');
    return imagePath;
  }
}

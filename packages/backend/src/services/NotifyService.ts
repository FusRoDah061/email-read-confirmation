import { format, parseISO } from 'date-fns';
import path from 'path';
import { inject, injectable } from 'tsyringe';
import IpLocationProvider from '../providers/IpLocationProvider/models/IpLocationProvider';
import MailProvider from '../providers/MailProvider/models/MailProvider';
import NotificationRepository from '../repositories/NotificationRepository/models/NotificationRepository';

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

    @inject('IpLocationProvider')
    private ipLocationProvider: IpLocationProvider,
  ) {}

  public async execute({
    notificationId,
    viewerIpAddress,
  }: RequestDTO): Promise<string> {
    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (notification) {
      console.log('Notification found.');
      notification.viewCount += 1;

      const updatedNotification = await this.notificationRepository.update(
        notification,
      );

      try {
        console.log('Viewer ip address: ', viewerIpAddress);

        const ipRegex = /((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/;

        let sanitizedIpAddress = viewerIpAddress;

        const regexMatches = ipRegex.exec(viewerIpAddress);

        if (regexMatches && regexMatches.length > 0) {
          sanitizedIpAddress = regexMatches[0].toString();
        }

        const viewerLocation = await this.ipLocationProvider.get(
          sanitizedIpAddress,
        );
        const viewerCity = viewerLocation.city
          ? `${viewerLocation.city}, ${viewerLocation.state} - ${viewerLocation.countryCode}`
          : undefined;

        await this.mailProvider.sendMail({
          to: { email: updatedNotification.sender },
          subject: `Your "${updatedNotification.description}" e-mail was just viewed by someone`,
          templateData: {
            file: path.join(
              __dirname,
              '..',
              'views',
              'templates',
              'notification.hbs',
            ),
            variables: {
              viewCount: updatedNotification.viewCount,
              description: updatedNotification.description,
              viewerLocation: viewerCity,
              recipient: updatedNotification.recipient,
              iconUrl: `${process.env.BACKEND_URL}/static/mail-icon.png`,
              expiration: format(
                parseISO(updatedNotification.expiration),
                'MM/dd/yyyy',
              ),
            },
          },
        });
      } catch (err) {
        console.error('Error sending notification: ', err);
      }
    } else {
      console.log('Notification not found.');
    }

    const imagePath = path.join(__dirname, '..', 'assets', 'transparent.png');
    return imagePath;
  }
}

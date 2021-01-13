import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateNotificationService from '../services/CreateNotificationService';
import NotifyService from '../services/NotifyService';

export default class NotificationController {
  public async create(request: Request, response: Response): Promise<void> {
    const sender = request.query.sender?.toString() as string;
    const description = request.query.description?.toString() as string;

    const createNotificationService = container.resolve(
      CreateNotificationService,
    );

    const notification = await createNotificationService.execute({
      sender,
      description,
    });

    response.json(notification);
  }

  public async notify(request: Request, response: Response): Promise<void> {
    const { notificationId } = request.params;
    const requestIps = request.ips;
    const viewerIpAddress =
      requestIps && requestIps.length > 0
        ? requestIps[requestIps.length - 1]
        : request.ip;

    console.log('requestIps: ', requestIps);
    console.log('viewerIpAddress: ', viewerIpAddress);

    const notifyService = container.resolve(NotifyService);

    const imagePath = await notifyService.execute({
      notificationId,
      viewerIpAddress,
    });

    response.sendFile(imagePath);
  }
}

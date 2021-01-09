import path from 'path';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateNotificationService from '../services/CreateNotificationService';

export default class NotificationController {

  public async create(request: Request, response: Response): Promise<void> {
    const sender = request.query.sender?.toString() as string;
    const description = request.query.description?.toString() as string;

    const createNotificationService = container.resolve(CreateNotificationService);

    const notification = await createNotificationService.execute({
      sender,
      description,
    });

    response.json(notification);
  }

  public async notify(request: Request, response: Response): Promise<void>{

  }

}

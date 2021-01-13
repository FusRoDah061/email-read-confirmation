import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import NotificationController from './controllers/NotificationController';

const router = Router();

const notificationController = new NotificationController();

router.post(
  '/notify',
  celebrate({
    [Segments.QUERY]: {
      sender: Joi.string().email().trim().required(),
      description: Joi.string().trim().max(100),
    },
  }),
  notificationController.create,
);

router.get(
  '/notify/:notificationId',
  celebrate({
    [Segments.PARAMS]: {
      notificationId: Joi.string().uuid().required(),
    },
  }),
  notificationController.notify,
);

export default router;

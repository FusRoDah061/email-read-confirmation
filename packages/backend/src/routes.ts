import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import NotificationController from './controllers/NotificationController';

const router = Router();

const notificationController = new NotificationController();

router.post(
  '/notify',
  celebrate(
    {
      [Segments.BODY]: {
        sender: Joi.string().email().trim().max(256).required().messages({
          'string.empty': `The notification email field cannot be empty`,
          'string.email': `Invalid notification email address`,
          'any.required': `Notification email is required to send this notification`,
          'string.max': `Email should not be longer than 256 characters!`,
        }),
        description: Joi.string().trim().max(100).required().messages({
          'string.empty': `The description field cannot be empty`,
          'string.max': `The description field should be longer than 100 characters!`,
          'any.required': `A description is required`,
        }),
        recipient: Joi.string()
          .trim()
          .max(100)
          .optional()
          .allow('', null)
          .messages({
            'string.max': `The recipient filed should be longer than 100 characters!`,
          }),
      },
    },
    { abortEarly: false },
  ),
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

import { container } from 'tsyringe';
import mailConfig from '../../config/mail';
import SESMailProvider from './implementations/SESMailProvider';
import MailProvider from './models/MailProvider';

const providers = {
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<MailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);

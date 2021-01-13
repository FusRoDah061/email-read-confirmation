import { container } from 'tsyringe';
import SmtpMailProvider from './implementations/SmtpMailProvider';
import MailProvider from './models/MailProvider';

container.registerInstance<MailProvider>(
  'MailProvider',
  container.resolve(SmtpMailProvider),
);

import { container } from 'tsyringe';
import HandlebarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider';
import MailTemplateProvider from './models/MailTemplateProvider';

const providers = {
  handlebars: HandlebarsMailTemplateProvider,
};

container.registerSingleton<MailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);

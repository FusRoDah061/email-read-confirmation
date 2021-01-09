import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import mailConfig from '../../../config/mail';
import aws from 'aws-sdk';
import MailProvider from "../models/MailProvider";
import SendMailDTO from '../dtos/SendMailDTO';
import MailTemplateProvider from '../../MailTemplateProvider/models/MailTemplateProvider';

@injectable()
export default class SESMailProvider implements MailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: MailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_DEFAULT_REGION,
      }),
    });
  }

  public async sendMail({
    to,
    subject,
    from,
    templateData,
  }: SendMailDTO): Promise<void> {
    await this.client.sendMail({
      from: {
        name: from?.name || mailConfig.defaults.from.name,
        address: from?.email || mailConfig.defaults.from.email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}

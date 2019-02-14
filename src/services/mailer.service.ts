import * as nodemailer from 'nodemailer';
import * as joi from 'joi';

import { logger } from '../common/logger';

// let id /*: number*/ = 0;

const schema = joi.object({
  from: joi.string().required(),
  to: joi.alternatives([joi.string(), joi.array().items(joi.string())]).required(),
  subject: joi.string(),
  text: joi.string(),
  html: joi.string(),
});

interface MailerAuth {
  host: string;
  service?: string;
  port?: number;
  user: string;
  pass: string;
}

export class MailerService {
  private readonly transporter: nodemailer.Transporter;

  constructor({ host, port, user, pass }: MailerAuth) {
    this.transporter = nodemailer.createTransport({
      host,
      port: port || 587,
      secure: false,
      auth: { user, pass },
    });
  }
  // TODO: handle {file: any}
  async sendMail(opts: nodemailer.SendMailOptions, file: any): Promise<void> {
    await joi.validate(opts, schema);

    if (!opts.subject) opts.subject = 'ᅠ';

    logger.info(`Sending email ${opts.from} -> ${opts.to}`);

    await this.transporter.sendMail({ attachments: file, ...opts });

    logger.info(`Email was sent`);
  }
}

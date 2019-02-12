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
  random: joi.boolean(),
});

interface AuthCred {
  user: string;
  pass: string;
}

interface MailerAuth {
  service: string;
  auth: AuthCred;
}

interface MailerAuthTest {
  host: string;
  auth: AuthCred;
}

export class MailerService {
  private readonly transporter: nodemailer.Transporter;

  constructor(opts: MailerAuth | MailerAuthTest) {
    this.transporter = nodemailer.createTransport(opts);
  }
  // TODO: handle {file: any}
  async sendMail(opts: nodemailer.SendMailOptions, file: any): Promise<void> {
    await joi.validate(opts, schema);

    // if(!Array.isArray(opts.to)) opts.to = opts.to.split(',')

    if (!opts.subject) opts.subject = 'ᅠ';

    logger.info(`Sending email ${opts.from} -> ${opts.to}`);

    await this.transporter.sendMail({ attachments: file, ...opts });

    logger.info(`Email was sent`);
  }
}

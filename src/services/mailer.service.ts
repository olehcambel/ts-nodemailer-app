// import {SentMessageInfo} from 'nodemailer'
import * as nodemailer from 'nodemailer';
import * as joi from 'joi';
import { logger } from '../common/logger';

// let id /*: number*/ = 0;

const schema = joi.object({
  from: joi.string().required(),
  to: joi.alternatives([
    joi.string(),
    joi.array().items(joi.string())
  ]).required() ,
  subject: joi.string(),
  text: joi.string(),
  html: joi.string(),
  random: joi.boolean(),
});

interface MailerOptions {
  service: string;
  user: string;
  pass: string;
}

export class MailerService {
  private readonly transporter: nodemailer.Transporter;

  constructor({ service, user, pass }: MailerOptions) {
    this.transporter = nodemailer.createTransport({
      service: service,
      auth: { user, pass },
    });
  }

  async sendMail(opts: nodemailer.SendMailOptions): Promise<void> {
    await joi.validate(opts, schema);

    // if(!Array.isArray(opts.to)) opts.to = opts.to.split(',')

    if (!opts.subject) opts.subject = 'ᅠ';

    logger.info(`Sending email ${opts.from} -> ${opts.to}`);

    await this.transporter.sendMail(opts);

    logger.info(`Email was sent`);
  }
}

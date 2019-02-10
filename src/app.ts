import express, { Errback, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import boom from 'boom';
import { JoiObject } from 'joi';

import { MailerService } from './services/mailer.service';
import { logger } from './common/logger';
import * as config from '../config';
import { asyncWrap } from './common/async-wrap';

const app = express();
const mailer = new MailerService(config.nodemailer);
asyncWrap();

const bodyParser = [express.json(), express.urlencoded({ extended: true })];
app.use(cors({ optionsSuccessStatus: 200 }));

app.post('*', bodyParser);

app.post('/', async (req, res) => {
  await mailer.sendMail(req.body);
  return res.status(200).json({ message: 'ok' });
});

app.use((req, _res, next) => {
  next(boom.notFound(`Cannot ${req.method} on ${req.path}`));
});

type ErrorHandler = Errback & boom & JoiObject & { statusCode: number };

app.use((err: ErrorHandler, _req: Request, res: Response, _next: NextFunction) => {
  let { output: { payload } = new boom(err).output } = err;

  if (!err.isBoom || err.isServer) {
    if (err.statusCode === 400 || err.isJoi) {
      payload = boom.badRequest(err.message).output.payload;
    } else {
      logger.error(err);
    }
  }

  return res.status(payload.statusCode).json(payload);
});

export default app;

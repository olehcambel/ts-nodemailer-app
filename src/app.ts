import express, { Errback, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import boom from 'boom';
import { JoiObject } from 'joi';

import { logger } from './common/logger';
import { asyncWrap } from './common/async-wrap';
import { appController } from './controllers/app.controller';

const app = express();
asyncWrap();

const bodyParser = [express.urlencoded({ extended: true }), express.json()];
app.use(cors({ optionsSuccessStatus: 200 }));

app.post('*', bodyParser);
app.use('/', appController);

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

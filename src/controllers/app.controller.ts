import { Router } from 'express';
import { AttachService, FileStreamOutput } from '../services/attach.service';
import { MailerService } from '../services/mailer.service';
import multer from '../middlewares/multer';
import * as config from '../../config';
import * as helpers from '../common/helpers';

const router = Router();

const mailer = new MailerService(config.nodemailer);

router.post('/', multer, async (req, res, next) => {
  try {
    const file: FileStreamOutput = req.file && AttachService.fileStream(req.file);

    await mailer.sendMail(req.body, file);
  } catch (err) {
    req.file && (await AttachService.removeFile(req.file));
    return next(err);
  }

  req.file && (await AttachService.removeFile(req.file));

  const success = helpers.onSuccess();
  return res.status(success.statusCode).json(success);
});

export const appController = router;

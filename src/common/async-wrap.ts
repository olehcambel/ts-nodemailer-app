import { Request, Response, NextFunction } from 'express';
const Layer = require('express/lib/router/layer');

export const asyncWrap = (): void => {
  Layer.prototype.handle_request = async function handle(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const fn = this.handle;

    // not a standard request handler
    if (fn.length > 3) return next();

    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import * as Consts from '../consts';

async function verifyToken(token: string, validator?: (value: string | object) => boolean) {
  try {
    const value = jwt.verify(token, Consts.sessionSeqretKey);
    return validator ? validator(value) : true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function requireToken(req: Request, res: Response, next: NextFunction) {
  if (!req.headers) {
    res.sendStatus(401);
    return;
  }

  const { authorization } = req.headers;
  if (!authorization) {
    res.sendStatus(401);
    return;
  }

  const token = authorization.replace(/^Bearer\s/, '');
  if (!(await verifyToken(token))) {
    res.sendStatus(401);
    return;
  }

  next();
}

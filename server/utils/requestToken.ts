import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as HttpStatus from 'http-status-codes';

import * as Consts from '../consts';

async function verifyToken(token: string, validator?: (value: string | object) => boolean) {
  try {
    const value = jwt.verify(token, Consts.sessionSeqretKey);
    return validator ? validator(value) : true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function requireToken(req: Request, res: Response, next: NextFunction) {
  if (!req.headers) {
    res.sendStatus(HttpStatus.UNAUTHORIZED);
    return;
  }

  const { authorization } = req.headers;
  if (!authorization) {
    res.sendStatus(HttpStatus.UNAUTHORIZED);
    return;
  }

  const token = authorization.replace(/^Bearer\s/, '');
  if (!(await verifyToken(token))) {
    res.sendStatus(HttpStatus.UNAUTHORIZED);
    return;
  }

  next();
}

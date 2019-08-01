import { Router } from 'express';
import jwt from 'jsonwebtoken';
import * as HttpStatus from 'http-status-codes';

import * as Consts from '../../consts';

export function register(router: Router) {
  router.get('/me', (req, res) => {
    if (req.session && req.session.token) {
      const data = jwt.verify(req.session.token, Consts.sessionSeqretKey);
      res.status(HttpStatus.OK).json(data);
      return;
    }

    res.status(HttpStatus.UNAUTHORIZED).send({
      message: 'not signin',
    });
  });
}

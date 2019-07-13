import { Router } from 'express';
import jwt from 'jsonwebtoken';

import * as Consts from '../../consts';

export function register(router: Router) {
  router.get('/me', (req, res) => {
    if (req.session && req.session.token) {
      const data = jwt.verify(req.session.token, Consts.sessionSeqretKey);
      res.status(200).json(data);
      return;
    }

    res.status(401).send({
      message: 'not signin',
    });
  });
}

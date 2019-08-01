import { Router } from 'express';
import jwt from 'jsonwebtoken';
import * as HttpStatus from 'http-status-codes';

import * as Consts from '../../consts';

export function register(router: Router) {
  router.post('/signin', (req, res) => {
    const { name, password } = req.body;
    if (name === 'kaave' && password === 'password') {
      const token = jwt.sign({ name, password, createdAt: Date.now() }, Consts.sessionSeqretKey);
      res.status(HttpStatus.OK).json({ message: 'success', token });
      return;
    }

    res.status(HttpStatus.BAD_REQUEST).send({
      message: 'failed',
    });
  });
}

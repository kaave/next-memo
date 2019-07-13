import express, { Express, Router } from 'express';

import * as Signin from './signin';
import * as Signout from './signout';
import * as Me from './me';

const router = express.Router();
Signin.register(router);
Signout.register(router);
Me.register(router);

export function register(target: Express | Router) {
  target.use('/v1', router);
}

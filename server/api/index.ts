import express, { Express, Router } from 'express';

import * as V1 from './v1';

const router = express.Router();
V1.register(router);

export function register(target: Express | Router) {
  target.use('/api', router);
}

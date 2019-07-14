import 'tslib';
import path from 'path';
import next from 'next';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import expressSession from 'express-session';

import * as Api from './api';
import * as Consts from './consts';
import { requireToken } from './utils/requestToken';

dotenv.config();

const port = process.env.PORT || 3000;
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

async function main() {
  await app.prepare();
  const server = express();

  /*
   * regist middleware
   */
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());
  server.use(
    expressSession({
      secret: Consts.sessionSeqretKey,
      resave: false,
      saveUninitialized: true,
      cookie: {
        httpOnly: Consts.isDevelopment,
        maxAge: parseInt(process.env.COOKIE_MAX_AGE || '', 10) || 24 * 60 * 60,
      },
    }),
  );

  Api.register(server);

  // auth test
  // @ts-ignore
  server.get('/secret', requireToken, (req, res) => res.send('it is secret message'));

  // https://github.com/hanford/next-offline/issues/141#issuecomment-508539109
  // @ts-ignore
  server.get('/service-worker.js', (req, res) =>
    res.sendFile(path.resolve(__dirname, '..', '.next', 'service-worker.js')),
  );

  server.use('/static', express.static(path.join(__dirname, '..', 'static')));

  // handle nextjs routing
  server.get('*', (req, res) => handle(req, res));

  await server.listen(port);
}

// eslint-disable-next-line no-console
main().then(() => console.log(`🚀 Ready on http://localhost:${port}`));

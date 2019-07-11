import path from 'path';
import express from 'express';
import next from 'next';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

async function main() {
  await app.prepare();
  const server = express();

  // https://github.com/hanford/next-offline/issues/141#issuecomment-508539109
  // @ts-ignore
  server.get('/service-worker.js', (req, res) =>
    res.sendFile(path.resolve(__dirname, '..', '.next', 'service-worker.js')),
  );

  // handle nextjs routing
  server.get('*', (req, res) => handle(req, res));

  await server.listen(port);
}

// eslint-disable-next-line no-console
main().then(() => console.log(`🚀 Ready on http://localhost:${port}`));

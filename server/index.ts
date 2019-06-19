import * as express from 'express';
import * as next from 'next';

const port = process.env.PORT || 3000;
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

async function main() {
  await app.prepare();
  const server = express();

  // handle nextjs routing
  server.get('*', (req, res) => handle(req, res));

  await server.listen(port);
}

// eslint-disable-next-line no-console
main().then(() => console.log(`🚀 Ready on http://localhost:${port}`));

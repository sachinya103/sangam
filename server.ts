import 'dotenv/config';
import path from 'node:path';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { createApiApp } from './server/app';

const PORT = Number(process.env.PORT) || 3000;
const IS_PROD = process.env.NODE_ENV === 'production';

async function start() {
  const app = createApiApp();

  if (!IS_PROD) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sangam Mobile Centre server running on http://0.0.0.0:${PORT}`);
  });
}

start();

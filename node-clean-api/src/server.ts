import { app } from './app';
import { env } from './config/env';

const startServer = () => {
  app.listen(env.port, () => {
    console.log(`🚀 Server running at http://localhost:${env.port}`);
    console.log(`📄 Swagger docs at http://localhost:${env.port}/docs`);
  });
};

startServer();

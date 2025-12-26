import { cors } from '@elysiajs/cors';
import { openapi } from '@elysiajs/openapi';
import Elysia from 'elysia';
import { betterAuthPlugin, OpenAPI } from './plugins/better-auth';

export class ElysiaServer {
  private _app!: Elysia;

  constructor() {
    this._app = new Elysia();
  }

  private setupRoutes(): void {
    // this._app.register(userRoutes, { prefix: '/api/users' });
    // this._app.register(authRoutes, { prefix: '/api/auth' });
    // this._app.register(serviceRequestRoutes, { prefix: '/api' });
    // this._app.register(proposalsRoutes, { prefix: '/api' });
    // this._app.register(schedulingRoutes, { prefix: '/api/v1' });
    // this._app.register(webhooksRoutes, { prefix: '/api' });
  }

  async start(port: number = 3000): Promise<void> {
    try {
      this._app
        .use(betterAuthPlugin)
        .use(
          cors({
            origin: 'http://localhost:3001',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            credentials: true,
            allowedHeaders: ['Content-Type', 'Authorization'],
          }),
        )
        .use(
          openapi({
            documentation: {
              components: await OpenAPI.components,
              paths: await OpenAPI.getPaths(),
            },
          }),
        )
        .listen(port);
      console.log(`🚀 Server running on port ${port}`);
    } catch (error) {
      console.error('Error starting server:', error);
      process.exit(1);
    }
  }

  close(): void {
    this._app.stop();
  }

  get app(): Elysia {
    return this._app;
  }
}

import auth from '@infra/auth/better-auth/config/better-auth.config';
import { AuthFactory } from '@infra/factories/third-party/auth.factory';
import { Elysia } from 'elysia';

export const betterAuthPlugin = new Elysia({ name: 'better-auth' })
  .mount(auth.handler)
  .macro({
    auth: {
      async resolve({ status, request }) {
        const betterAuth = AuthFactory.create();
        const session = await betterAuth.authenticate(request);

        if (!session) {
          return status(401);
        }

        return session;
      },
    },
  });

let _schema: ReturnType<typeof auth.api.generateOpenAPISchema>;
const getSchema = async () => {
  if (!_schema) {
    _schema = auth.api.generateOpenAPISchema();
  }
  return _schema;
};

export const OpenAPI = {
  getPaths: (prefix = '/auth') =>
    getSchema().then(({ paths }) => {
      const reference: typeof paths = Object.create(null);

      for (const path of Object.keys(paths)) {
        const key = prefix + path;
        reference[key] = paths[path];

        for (const method of Object.keys(paths[path])) {
          const operation = (reference[key] as any)[method];

          operation.tags = ['Better Auth'];
        }
      }

      return reference;
    }) as Promise<any>,
  components: getSchema().then(({ components }) => components) as Promise<any>,
} as const;

import Elysia from 'elysia';

export const userRoute = new Elysia({ prefix: '/auth' }).get(
  '/user/:id',
  ({ params }) => `Get user by ID: ${params.id}`,
  {
    detail: {
      tags: ['User'],
      description: 'Get user by ID',
    },
  },
);

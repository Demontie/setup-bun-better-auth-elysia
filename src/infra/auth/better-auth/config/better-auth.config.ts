import 'dotenv/config';
import { DrizzleClientService } from '@infra/db/drizzle/drizzle-client';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { openAPI } from 'better-auth/plugins';

const auth = betterAuth({
  basePath: '/auth',
  secret: process.env.BETTER_AUTH_SECRET,
  user: {
    fields: {
      image: 'avatar',
    },
    additionalFields: {
      role: {
        type: 'string',
        required: false,
        defaultValue: 'user',
      },
      lang: {
        type: 'string',
        required: false,
        defaultValue: 'pt',
        maxLength: 5,
      },
    },
  },
  database: drizzleAdapter(DrizzleClientService.getInstance().getClient(), {
    provider: 'pg',
    usePlural: true,
  }),
  advanced: {
    database: {
      generateId: false,
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    password: {
      hash: (password) => Bun.password.hash(password),
      verify: ({ password, hash }) => Bun.password.verify(password, hash),
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes for cache
    },
  },
  plugins: [openAPI()],
});

export default auth;

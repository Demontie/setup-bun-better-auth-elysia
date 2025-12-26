import authConfig from '@infra/auth/better-auth/config/better-auth.config';
import { BetterAuthProvider } from '@infra/auth/better-auth/providers/auth-provider';

export class AuthFactory {
  static create(): BetterAuthProvider {
    return new BetterAuthProvider(authConfig);
  }
}

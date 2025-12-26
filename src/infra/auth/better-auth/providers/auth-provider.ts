import type authConfig from '../config/better-auth.config';

export class BetterAuthProvider {
  constructor(private readonly auth: typeof authConfig) {}

  async authenticate(request: Request): Promise<any | null> {
    const session = await this.auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return null;
    }

    return session;
  }
}

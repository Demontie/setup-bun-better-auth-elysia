export interface IConfig {
  port: number;
  database: {
    url: string;
    provider: string;
  };
  auth: {
    secret: string;
    baseUrl: string;
  };
  google: {
    clientId: string;
    clientSecret: string;
  };
  environment: string;
}

export class Config {
  private static instance: Config;
  private config: IConfig;

  private constructor() {
    this.config = this.loadConfig();
  }

  static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  loadConfig(): IConfig {
    const port = parseInt(process.env.PORT || '4000', 10);
    const databaseUrl = process.env.DATABASE_URL;
    const provider = process.env.DATABASE_PROVIDER;
    const authSecret = process.env.BETTER_AUTH_SECRET;
    const authBaseUrl = process.env.BETTER_AUTH_URL;
    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

    const environment = process.env.NODE_ENV;

    if (!databaseUrl) {
      throw new Error('DATABASE_URL environment variable is required');
    }

    if (!provider) {
      throw new Error('DATABASE_PROVIDER environment variable is required');
    }

    if (!authSecret) {
      throw new Error('AUTH_SECRET environment variable is required');
    }

    if (!authBaseUrl) {
      throw new Error('AUTH_BASE_URL environment variable is required');
    }

    if (!googleClientId) {
      throw new Error('GOOGLE_CLIENT_ID environment variable is required');
    }

    if (!googleClientSecret) {
      throw new Error('GOOGLE_CLIENT_SECRET environment variable is required');
    }

    if (!environment) {
      throw new Error('NODE_ENV environment variable is required');
    }

    this.config = {
      port,
      database: {
        url: databaseUrl!,
        provider: provider!,
      },
      auth: {
        secret: authSecret!,
        baseUrl: authBaseUrl!,
      },
      google: {
        clientId: googleClientId!,
        clientSecret: googleClientSecret!,
      },
      environment,
    };

    return this.config;
  }

  getConfig(): IConfig {
    return this.config;
  }

  isDevelopment(): boolean {
    return this.config.environment === 'development';
  }

  isProduction(): boolean {
    return this.config.environment === 'production';
  }

  isTesting(): boolean {
    return this.config.environment === 'testing';
  }
}

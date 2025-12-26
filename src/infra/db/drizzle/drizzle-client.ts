import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { schema } from './schemas';

let drizzleClientServiceInstance: DrizzleClientService | undefined;

export class DrizzleClientService {
  private uri: string | undefined;
  private pool: Pool | undefined;
  private client: NodePgDatabase<typeof schema> | undefined;

  constructor(uri?: string) {
    this.uri = uri || process.env.DATABASE_URL;
  }

  static getInstance(uri?: string): DrizzleClientService {
    if (!drizzleClientServiceInstance) {
      drizzleClientServiceInstance = new DrizzleClientService(uri);
    }
    return drizzleClientServiceInstance;
  }

  getClient(): NodePgDatabase<typeof schema> {
    if (this.client) {
      return this.client;
    }
    if (!this.uri) {
      throw new Error('DATABASE_URL is not set.');
    }
    this.pool = new Pool({
      connectionString: this.uri,
      ssl: false,
    });
    this.client = drizzle(this.pool, { schema });
    return this.client;
  }

  async disconnect(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
    }
    this.pool = undefined;
    this.client = undefined;
    drizzleClientServiceInstance = undefined;
  }

  async verifyConnection(): Promise<Record<string, unknown>[]> {
    const db = this.getClient();
    const result = await db.execute('select 1');
    return (result as any).rows ?? [];
  }
}

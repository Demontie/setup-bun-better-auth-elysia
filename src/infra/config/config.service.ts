import { DrizzleClientService } from '@infra/db/drizzle/drizzle-client';
import { ElysiaServer } from '@infra/http/elysia/server';
import { Config } from './config';

export class ConfigService {
  private server: ElysiaServer;
  private config: Config;
  private dbService: DrizzleClientService;

  constructor() {
    /** Config */
    this.config = Config.getInstance();

    /** Database Service */
    this.dbService = DrizzleClientService.getInstance();

    /** HTTP Server */
    this.server = new ElysiaServer();
  }

  /**
   * Inicializa todos os serviços da aplicação
   */
  async initialize(): Promise<void> {
    try {
      console.log('🚀 Starting application initialization...');

      // Conectar ao MongoDB
      await this.connectToDatabase();

      // Iniciar servidor HTTP
      await this.startHttpServer();

      console.log('✅ Application initialized successfully');
    } catch (error) {
      console.error('❌ Error during application initialization:', error);
      await this.cleanup();
      throw error;
    }
  }

  /**
   * Conecta ao banco de dados MongoDB
   */
  private async connectToDatabase(): Promise<void> {
    try {
      const result = await this.dbService.verifyConnection();
      console.log('Database connection result:', result);
      if (result.length === 0) {
        throw new Error('Database connection failed');
      }
      console.log('✅ Database connected');
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      throw error;
    }
  }

  /**
   * Inicia o servidor HTTP
   */
  private async startHttpServer(): Promise<void> {
    const { port } = this.config.getConfig();
    await this.server.start(port ?? 3000);
  }

  /**
   * Para a aplicação de forma graceful
   */
  async shutdown(): Promise<void> {
    try {
      console.log('🛑 Starting application shutdown...');

      // Fechar servidor HTTP
      if (this.server) {
        this.server.close();
      }

      // Fechar conexões
      await this.cleanup();

      console.log('✅ Application shutdown completed');
    } catch (error) {
      console.error('❌ Error during application shutdown:', error);
      throw error;
    }
  }

  /**
   * Limpa recursos da aplicação
   */
  private async cleanup(): Promise<void> {
    try {
      // Aqui você pode adicionar limpeza de outros recursos
      // Por exemplo: fechar conexões de banco, message broker, etc.
      console.log('🧹 Cleaning up resources...');
    } catch (error) {
      console.error('❌ Error during cleanup:', error);
    }
  }
}

// Prisma service

import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error) {
      console.warn('⚠️  No se pudo conectar a la base de datos. El servicio continuará pero las operaciones de DB fallarán.');
      console.warn('💡 Asegúrate de configurar DATABASE_URL en tu archivo .env');
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}

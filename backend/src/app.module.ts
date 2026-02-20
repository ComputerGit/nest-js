import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmployeeModule } from './modules/employee/employee.module';
import { HealthModule } from './health/health.module';
import { TerminusModule } from '@nestjs/terminus';
import { GracefulShutdownService } from './infrastructure/lifecycle/graceful-shutdown.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';
import { CacheModule } from './infrastructure/cache/cache.module';
// import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    // 🌍 Global config
    ConfigModule.forRoot({ isGlobal: true }),

    // 🧠 MongoDB connection (Async & Safe for Serverless)
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        // Serverless best practices to prevent connection hanging
        maxPoolSize: 10,
        maxIdleTimeMS: 60000,
        serverSelectionTimeoutMS: 5000,
      }),
      inject: [ConfigService],
    }),

    // 🚦 Rate limiting
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,
          limit: 100,
        },
      ],
    }),
    // 📦 Feature modules
    TerminusModule,
    CacheModule,
    HealthModule,
    EmployeeModule,
    // UserModule,
    AuthModule,
  ],
  providers: [
    Reflector,
    GracefulShutdownService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}

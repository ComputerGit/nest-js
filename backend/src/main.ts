// src/main.ts
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import helmet from 'helmet';
import { createSession } from './infrastructure/session/session.config';
import { RedisService } from './infrastructure/cache/redis.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  // Firebase fallback to localhost
  const allowedOrigins = process.env.FRONTEND_URL
    ? [process.env.FRONTEND_URL, 'http://localhost:5173']
    : ['http://localhost:5173'];

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  // Trust proxy for Cloud Run HTTPS cookies
  app.getHttpAdapter().getInstance().set('trust proxy', 1);

  // ⚡ MINIMAL REDIS INITIALIZATION
  const redisService = app.get(RedisService);
  const redisClient = redisService.createClient();

  redisClient.on('error', (err) =>
    console.error('❌ Redis error:', err.message),
  );
  redisClient.on('connect', () => console.log('✅ Redis connected'));

  redisClient.on('ready', () => {
    console.log('✅ Redis is ready');
  });

  app.use(createSession(redisClient));

  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );

  app.enableShutdownHooks();

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new GlobalExceptionFilter(httpAdapterHost));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      stopAtFirstError: true,
    }),
  );

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();

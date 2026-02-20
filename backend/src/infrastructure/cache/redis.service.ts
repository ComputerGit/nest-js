import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(private config: ConfigService) {}

  createClient(): Redis {
    const redisUrl = this.config.get<string>('REDIS_URL');

    // ✅ PRODUCTION (Upstash)
    if (redisUrl) {
      console.log('🚀 Using Upstash Redis');

      return new Redis(redisUrl, {
        maxRetriesPerRequest: 1,
        enableReadyCheck: true,
      });
    }

    // ✅ LOCAL DEVELOPMENT (Docker)
    console.log('🐳 Using Local Docker Redis');

    return new Redis({
      host: this.config.get<string>('REDIS_HOST'),
      port: this.config.get<number>('REDIS_PORT'),
      lazyConnect: true,
      maxRetriesPerRequest: 1,
      enableReadyCheck: true,
    });
  }
}

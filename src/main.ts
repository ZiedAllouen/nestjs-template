import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { json } from 'express';

import { AppModule } from './app/app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  

    app.use(helmet());
    app.use(json({ limit: '20mb' }));
    app.enableCors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentilas: true,
    });

    app.useGlobalPipes(
      new ZodValidationPipe(),
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );

    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
      prefix: 'api/v',
    });

    app.setGlobalPrefix(configService.get('API_PREFIX') || 'api');

    const port = configService.get('PORT') || 3000;
    await app.listen(port);

    const environment = configService.get('NODE_ENV');
    logger.log(`🚀 Application running in ${environment} mode`);
    logger.log(`📡 Listening on port ${port}`);
    logger.log(`🔗 Base URL: http://localhost:${port}/${configService.get('API_PREFIX')}`);
}

bootstrap();

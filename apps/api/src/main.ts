import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from './utils/error.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  CorsOptions,
  CorsOptionsDelegate,
} from '@nestjs/common/interfaces/external/cors-options.interface';

function getCors():
  | boolean
  | CorsOptions
  | CorsOptionsDelegate<any>
  | undefined {
  const whiteList = {
    dev: [
      'http://localhost:3000',
      'http://localhost:3000/',
      'http://localhost:3001',
      'http://localhost:3001/',
    ],
    prod: [],
  };

  return {
    origin: whiteList.dev,
    credentials: true,
  };

  return {
    origin: /^(https:\/\/([^\.]*\.)?eovo\.capital)$/i,
  };
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: getCors(),
  });

  app.useStaticAssets(process.cwd() + '/uploads', {
    prefix: '/uploads/',
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(cookieParser());

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter as any));

  await app.listen(8000);
}
bootstrap();

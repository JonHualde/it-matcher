import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from './utils/error.filter';
import {
  CorsOptions,
  CorsOptionsDelegate,
} from '@nestjs/common/interfaces/external/cors-options.interface';

function getCors():
  | boolean
  | CorsOptions
  | CorsOptionsDelegate<any>
  | undefined {
  if (process.env.APP_ENV !== 'production') {
  }

  return {
    origin: 'http://localhost:3000',
    credentials: true,
  };

  return {
    origin: /^(https:\/\/([^\.]*\.)?eovo\.capital)$/i,
  };
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: getCors(),
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(cookieParser());

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(8000);
}
bootstrap();

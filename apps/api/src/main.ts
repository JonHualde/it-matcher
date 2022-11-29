import { NestFactory } from '@nestjs/core';
import { ValidationPipe, HttpStatus } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      always: true,
      forbidUnknownValues: true,
    }),
  );
  app.use(cookieParser());
  await app.listen(8000);
}
bootstrap();

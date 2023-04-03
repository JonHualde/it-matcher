import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from './utils/error.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import {
  CorsOptions,
  CorsOptionsDelegate,
} from '@nestjs/common/interfaces/external/cors-options.interface';

let server: Handler;

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
    staging: true,
    prod: true,
  };

  return {
    origin: whiteList[process.env.NODE_ENV],
    credentials: true,
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

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};

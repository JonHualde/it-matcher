import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { isArray } from 'lodash';
import * as fs from 'fs';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: any) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Handle prisma exceptions
    if (exception instanceof PrismaClientKnownRequestError) {
      let e = exception as PrismaClientKnownRequestError;
      if (e.code === 'P2002') {
        response.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          message: `Field(s): ${(e?.meta as any)?.target.join(
            ',',
          )} already exists`,
        });
        return;
      } else if (e.code === 'P2003') {
        response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Specified fields values doesn't exists`,
        });
        return;
      } else if (e.code === 'P2025') {
        response.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Specified resource could not be found',
        });
        return;
      } else {
        console.error(exception);
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Your request could not be processed',
        });
        return;
      }
    } else if (exception instanceof PrismaClientValidationError) {
      console.error(exception);

      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Your request could not be processed',
      });
      return;
    } else if (exception?.name === 'NotFoundError') {
      response.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Specified resource could not be found',
      });
      return;
    }

    const status = exception.getStatus();

    const getFiles = (files: Express.Multer.File[] | unknown | undefined) => {
      if (!files) return [];
      if (isArray(files)) return files;
      return Object.values(files);
    };

    const filePaths = getFiles(request.files);

    for (const file of filePaths) {
      fs.unlink(file[0].path, (err) => {
        if (err) {
          console.error(err);
          return err;
        }
      });
    }

    response.status(status).json(exception.getResponse());
  }
}

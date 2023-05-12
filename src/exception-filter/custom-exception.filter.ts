import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    let message = 'Something went wrong, please try again later';
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception.name === 'NotFoundException') {
      status = HttpStatus.NOT_FOUND;
      message = exception.getResponse()['message'];
    }

    if (exception.name === 'BadRequestException') {
      message = exception.getResponse()['message'].join(', ');
      status = HttpStatus.BAD_REQUEST;
    }

    if (exception.code && exception.code === 11000) {
      status = HttpStatus.CONFLICT;
      message = `Duplicate value entered for ${Object.keys(
        exception['keyValue'],
      )} field, please enter another value`;
    }

    return response.status(status).json({ message, status });
  }
}

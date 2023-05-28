import { Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
@Catch()
export class CustomExceptionFilter implements GqlExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    let message =
      exception.message || 'Something went wrong, please try again later';
    let status =
      exception.code || exception.status || HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception.name === 'NotFoundException') {
      status = HttpStatus.NOT_FOUND;
      message = exception.response.message;
    }

    if (exception.name === 'BadRequestException') {
      message = exception.response.message.join(', ');
      status = HttpStatus.BAD_REQUEST;
    }

    if (exception.code && exception.code === 11000) {
      status = HttpStatus.CONFLICT;
      message = `Duplicate value entered for ${Object.keys(
        exception['keyValue'],
      )} field, please enter another value`;
    }

    throw new GraphQLError(message, {
      extensions: { code: status },
    });
  }
}

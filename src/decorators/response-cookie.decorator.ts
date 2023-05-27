import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Response } from 'express';

export const ResponseCookie = createParamDecorator(
  (data: string, context: ExecutionContext): Response => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.res;
  },
);

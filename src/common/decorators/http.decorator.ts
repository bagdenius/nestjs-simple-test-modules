import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { IS_DEV_ENV } from '../utils';

export const UserAgent = createParamDecorator(
  (_: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest() as Request;
    return request.header('user-agent');
  },
);

export const ClientIp = createParamDecorator(
  (_: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest() as Request;
    const ip = IS_DEV_ENV
      ? '37.19.218.173'
      : Array.isArray(request.headers['cf-connection-ip'])
        ? request.header['cf-connection-ip'][0]
        : (request.headers['cf-connection-ip'] ??
          (typeof request.headers['x-forwarded-for'] === 'string'
            ? request.headers['x-forwarded-for'].split(',')[0]
            : request.ip));
    return ip;
  },
);

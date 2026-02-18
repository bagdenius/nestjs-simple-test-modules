import { createParamDecorator } from '@nestjs/common';
import type { Request } from 'express';

export const UserAgent = createParamDecorator((data, context) => {
  const request = context.switchToHttp().getRequest() as Request;
  return request.header('user-agent');
});

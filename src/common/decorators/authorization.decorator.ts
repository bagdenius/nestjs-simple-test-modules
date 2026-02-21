import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { JwtGuard, RolesGuard } from '../guards';
import { Roles } from './roles.decorator';

export function Authorization(...roles: UserRole[]) {
  if (roles.length > 0)
    return applyDecorators(Roles(...roles), UseGuards(JwtGuard, RolesGuard));
  return applyDecorators(UseGuards(JwtGuard));
}

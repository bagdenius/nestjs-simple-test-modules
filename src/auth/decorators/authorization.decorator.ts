import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserRole } from '../../generated/prisma/enums';
import { JwtGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from './roles.decorator';

export function Authorization(...roles: UserRole[]) {
  if (roles.length > 0)
    return applyDecorators(Roles(...roles), UseGuards(JwtGuard, RolesGuard));
  return applyDecorators(UseGuards(JwtGuard));
}

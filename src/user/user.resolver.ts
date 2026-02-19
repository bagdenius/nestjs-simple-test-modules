import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserModel } from './models/user.model';
import { Authorization } from '../auth/decorators/authorization.decorator';
import { Authorized } from '../auth/decorators/authorized.guard';
import type { User } from '../generated/prisma/client';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserModel)
  @Authorization()
  getMe(@Authorized() user: User) {
    return user;
  }

  @Query(() => [UserModel])
  getUsers() {
    return this.userService.findAll();
  }
}

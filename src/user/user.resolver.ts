import { Query, Resolver } from '@nestjs/graphql';
import { Authorization } from '../auth/decorators/authorization.decorator';
import { Authorized } from '../auth/decorators/authorized.guard';
import { UserRole, type User } from '../generated/prisma/client';
import { UserModel } from './models/user.model';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserModel, { description: 'Returns current user' })
  @Authorization()
  getMe(@Authorized() user: User) {
    return user;
  }

  @Authorization(UserRole.ADMIN)
  @Query(() => [UserModel], {
    description: 'Returns list of all users. Requires admin role credentials',
  })
  async getUsers() {
    return await this.userService.getAll();
  }
}

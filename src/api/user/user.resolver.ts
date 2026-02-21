import { Query, Resolver } from '@nestjs/graphql';
import { type User, UserRole } from '@prisma/client';
import { Authorization, Authorized } from '../../common/decorators';
import { UserModel } from './models';
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

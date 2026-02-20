import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.model';
import { User, UserRole } from '@prisma/client';

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'Roles for user model',
});

@ObjectType({ description: 'Model of User' })
export class UserModel extends BaseModel implements User {
  @Field(() => String, { description: 'Name of the user' })
  name: string;

  @Field(() => String, { description: 'User account email' })
  email: string;

  @Field(() => UserRole, { description: 'User account role' })
  role: UserRole;

  @Field(() => String, { description: 'User account password' })
  password: string;
}

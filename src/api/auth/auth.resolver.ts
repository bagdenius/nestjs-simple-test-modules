import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import type { GqlContext } from '../../common/interfaces/gql-context.interface';
import { AuthService } from './auth.service';
import { LoginInput } from './inputs/login.input';
import { SignupInput } from './inputs/signup.input';
import { AuthModel } from './models/auth.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthModel)
  async signup(
    @Context() { res }: GqlContext,
    @Args('data') input: SignupInput,
  ) {
    return this.authService.signup(res, input);
  }

  @Mutation(() => AuthModel)
  async login(@Context() { res }: GqlContext, @Args('data') input: LoginInput) {
    return this.authService.login(res, input);
  }

  @Mutation(() => AuthModel)
  async refresh(@Context() { req, res }: GqlContext) {
    return this.authService.refresh(req, res);
  }

  @Mutation(() => Boolean)
  async logout(@Context() { res }: GqlContext) {
    return this.authService.logout(res);
  }
}

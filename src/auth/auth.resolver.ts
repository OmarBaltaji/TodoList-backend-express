import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginAuthDto, RegisterAuthDto } from './dto';
import { UserType } from 'src/user/types';
import { UserResponseType } from 'src/user/types';

@Resolver((type) => UserType)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation((returns) => UserResponseType)
  register(@Args('dto') dto: RegisterAuthDto) {
    return this.authService.register(dto);
  }

  @Mutation((returns) => UserResponseType)
  login(@Args('dto') dto: LoginAuthDto) {
    return this.authService.login(dto);
  }
}

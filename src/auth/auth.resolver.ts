import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginAuthDto, RegisterAuthDto } from './dto';
import { UserType } from 'src/user/graphql/user.type';
import { UserResponseType } from 'src/user/graphql/response.type';

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

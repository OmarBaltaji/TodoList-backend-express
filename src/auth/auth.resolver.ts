import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginAuthDto, RegisterAuthDto } from './dto';
import { AuthResponseType, UserResponseType, UserType } from 'src/user/types';
import { ResponseCookie } from 'src/decorators/response-cookie.decorator';
import { Response } from 'express';

@Resolver((type) => UserType)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation((returns) => AuthResponseType)
  register(@Args('dto') dto: RegisterAuthDto) {
    return this.authService.register(dto);
  }

  @Mutation((returns) => UserResponseType)
  async login(@Args('dto') dto: LoginAuthDto, @ResponseCookie() res: Response) {
    const { access_token } = await this.authService.login(dto);
    return { access_token };
  }

  @Mutation((returns) => AuthResponseType)
  logout(@ResponseCookie() res: Response) {
    res.clearCookie('access_token');
    return { result: true };
  }
}

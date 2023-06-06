import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginAuthDto, RegisterAuthDto } from './dto';
import { AuthResponseType, UserType } from 'src/user/types';
import { ResponseCookie } from 'src/decorators/response-cookie.decorator';
import { Response } from 'express';

@Resolver((type) => UserType)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation((returns) => AuthResponseType)
  register(@Args('dto') dto: RegisterAuthDto) {
    return this.authService.register(dto);
  }

  @Mutation((returns) => AuthResponseType)
  async login(@Args('dto') dto: LoginAuthDto, @ResponseCookie() res: Response) {
    const { access_token } = await this.authService.login(dto);
    const environment = process.env.NODE_ENV || 'development';
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: environment === 'production' ? true : false,
      domain: environment === 'production' ? 'onrender.com' : 'localhost',
      sameSite: environment === 'production' ? 'none' : 'lax',
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      path: '/',
    });

    return { result: true };
  }

  @Mutation((returns) => AuthResponseType)
  logout(@ResponseCookie() res: Response) {
    res.clearCookie('access_token');
    return { result: true };
  }
}

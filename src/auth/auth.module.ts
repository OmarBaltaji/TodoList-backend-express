import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/types';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [JwtStrategy, AuthService, AuthResolver],
  controllers: [AuthController],
})
export class AuthModule {}

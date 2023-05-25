import { Injectable, ForbiddenException } from '@nestjs/common';
import { LoginAuthDto, RegisterAuthDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/types';
import * as argon from 'argon2';
import { ObjectId } from 'mongodb';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private jwt: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async register(dto: RegisterAuthDto) {
    const password = await argon.hash(dto.password);

    try {
      const user = await this.userModel.create({
        email: dto.email,
        password: password,
        fullName: dto.fullName,
      });

      return this.signToken(user._id, user.email);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Credentials taken');
      }

      throw error;
    }
  }

  async login(dto: LoginAuthDto) {
    const user = await this.userModel.findOne({ email: dto.email });

    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const pwMatches = await argon.verify(user.password, dto.password);

    if (!pwMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }

    return this.signToken(user._id, user.email);
  }

  async signToken(
    userId: ObjectId,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret: this.config.get('JWT_SECRET'),
    });

    return {
      access_token: token,
    };
  }
}

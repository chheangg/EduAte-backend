/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findUserByUsername(username);
    const isPasswordCorrect = await bcrypt.compare(pass, user.passwordHash);
    if (!user || !isPasswordCorrect) {
      return null;
    }
    const { passwordHash, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}

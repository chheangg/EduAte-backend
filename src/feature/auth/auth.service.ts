/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findUserByUsername(username);
    console.log(user);
    const isPasswordCorrect = await bcrypt.compare(pass, user.passwordHash);
    if (!user || !isPasswordCorrect) {
      throw new UnauthorizedException();
    }
    const { passwordHash, ...result } = user;
    console.log(user);
    return result;
  }
}

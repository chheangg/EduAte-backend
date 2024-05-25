import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/create-user.dto';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}

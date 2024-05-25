import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.username = createUserDto.username;
    user.role = createUserDto.role;

    const saltRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltRounds);

    user.passwordHash = hash;

    return this.userRepository.save(user);
  }

  findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  findUser(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  findUserByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        username: username,
      },
      select: ['username', 'id', 'passwordHash'],
    });
  }
}

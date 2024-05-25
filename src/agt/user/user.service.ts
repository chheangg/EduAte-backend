import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.role = createUserDto.role;

    return this.userRepository.save(user);
  }

  findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  findUser(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  findUserByUsername(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
  }
}

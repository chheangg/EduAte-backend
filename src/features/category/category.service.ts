import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  findAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }
}

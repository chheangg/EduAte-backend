import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  findAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const isCategoryExist = await this.categoryRepository.findOneBy({
      name: this.createCategory.name,
    });

    if (isCategoryExist) {
      return null;
    }

    const category: Category = new Category();
    category.name = createCategoryDto.name;
    return this.categoryRepository.save(category);
  }
}

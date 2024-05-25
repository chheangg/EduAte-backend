import { CategoryService } from './category.service';
import { Controller, Get } from '@nestjs/common';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAllCategories() {
    return this.categoryService.findAllCategories();
  }
}

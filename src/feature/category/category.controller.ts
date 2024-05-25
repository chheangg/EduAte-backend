import { CategoryService } from './category.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCategoryDto } from './create-category.dto';

@Controller('/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAllCategories() {
    return this.categoryService.findAllCategories();
  }

  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    console.log(createCategoryDto);
    return this.categoryService.createCategory(createCategoryDto);
  }
}

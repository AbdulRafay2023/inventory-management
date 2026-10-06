import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly CategoryService: CategoryService) {}

  @Post()
  createCategory(@Body() data: CreateCategoryDto) {
    return this.CategoryService.createCategory(data);
  }
}

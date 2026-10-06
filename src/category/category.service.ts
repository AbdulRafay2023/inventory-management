import { DatabaseService } from './../database/database.service';
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly databaservice: DatabaseService) {}

  async createCategory(data: CreateCategoryDto) {
    return this.databaservice.category.create({
      data,
    });
  }
}

import { Type } from 'class-transformer';
import { IsOptional, IsString, Min, IsInt, IsIn } from 'class-validator';

export class ProductQueryDto {
  //search
  @IsOptional()
  @IsString()
  search?: string;

  //filter min price
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  minPrice?: number;

  //filter max price
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  maxPrice?: number;

  //filter category
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  categoryId?: number;

  //sorting
  @IsOptional()
  @IsString()
  @IsIn(['name', 'price', 'quantity', 'createdAt'])
  sortBy?: 'name' | 'price' | 'quantity' | 'createdAt';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';

  //Pagination
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}

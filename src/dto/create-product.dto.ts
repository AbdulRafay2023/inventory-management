import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  price: number;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  quantity: number;
}

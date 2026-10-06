import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsInt()
  @Min(0)
  price: number;

  @IsInt()
  @Min(0)
  quantity: number;
}

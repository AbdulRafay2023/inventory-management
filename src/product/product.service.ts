import { ConflictException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly databaseService: DatabaseService) {}

  //create a product
  async createProduct(data: CreateProductDto) {
    //check product with the same sku exists?
    const existingProduct = await this.databaseService.product.findUnique({
      where: {
        sku: data.sku,
      },
    });

    if (existingProduct) {
      throw new ConflictException('Product with the same SKU already exists');
    }

    return this.databaseService.product.create({
      data,
    });
  }

  
}

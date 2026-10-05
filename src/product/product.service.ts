import { ConflictException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ApiResponse } from './interfaces/api-response.interface';
import { ProductResponse } from './interfaces/product-response.interface';

@Injectable()
export class ProductService {
  constructor(private readonly databaseService: DatabaseService) {}

  //create a product
  async createProduct(
    data: CreateProductDto,
  ): Promise<ApiResponse<ProductResponse>> {
    //check product with the same sku exists?
    const existingProduct = await this.databaseService.product.findUnique({
      where: {
        sku: data.sku,
      },
    });

    if (existingProduct) {
      throw new ConflictException('Product with the same SKU already exists');
    }

    const product = await this.databaseService.product.create({
      data,
    });

    return {
      success: true,
      message: 'Product created successfully',
      data: product,
    };
  }

  //get all products
  async getAllProducts() {
    return this.databaseService.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  //get product by id
  async getProductById(id: number) {
    const product = await this.databaseService.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) {
      throw new ConflictException('Product not found');
    }
    return product;
  }

  //update product by id
  async updateProduct(id: number, data: UpdateProductDto) {
    const product = await this.databaseService.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) {
      throw new ConflictException('Product not found');
    }
    await this.databaseService.product.update({
      where: {
        id,
      },
      data,
    });

    return {
      message: 'Product updated successfully',
    };
  }

  //delete product by id
  async deleteProduct(id: number) {
    const product = await this.databaseService.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) {
      throw new ConflictException('Product not found');
    }
    await this.databaseService.product.delete({
      where: {
        id,
      },
    });
    return {
      message: 'Product deleted successfully',
    };
  }
}

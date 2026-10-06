import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductFormatInputType, ProductFormatResponseType } from './types';
import { ApiResponseType } from './types/api-response.type';

@Injectable()
export class ProductService {
  logger: any;
  constructor(private readonly databaseService: DatabaseService) {}

  //create a product
  async createProduct(data: CreateProductDto): Promise<ProductFormatInputType> {
    //check product with the same sku exists?
    try {
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

      return product;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  //get all products
  async getAllProducts(): Promise<
    ApiResponseType<ProductFormatResponseType[]>
  > {
    try {
      const products = await this.databaseService.product.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });

      return {
        success: true,
        message: 'product fetched successfully',
        data: products,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  //get product by id
  async getProductById(id: number): Promise<ProductFormatResponseType> {
    try {
      const product = await this.databaseService.product.findUnique({
        where: {
          id,
        },
      });
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return product;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  //update product by id
  async updateProduct(id: number, data: UpdateProductDto) {
    try {
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
        data,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  //delete product by id
  async deleteProduct(id: number) {
    try {
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
      return product;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { DatabaseService } from '../database/database.service';

import { ProductFormatResponseType } from './types';
import { ApiResponseType } from './types/api-response.type';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';

@Injectable()
export class ProductService {
  constructor(private readonly databaseService: DatabaseService) {}

  // Create a product
  async createProduct(
    data: CreateProductDto,
  ): Promise<ApiResponseType<ProductFormatResponseType>> {
    try {
      // Check if SKU already exists
      const existingProduct = await this.databaseService.product.findUnique({
        where: {
          sku: data.sku,
        },
      });

      if (existingProduct) {
        throw new ConflictException('Product with the same SKU already exists');
      }

      const product = await this.databaseService.product.create({
        data: {
          name: data.name,
          sku: data.sku,
          price: data.price,
          quantity: data.quantity,
          category_id: data.categoryId,
        },
        include: {
          category: {
            select: {
              name: true,
            },
          },
          supplier: {
            select: {
              name: true,
            },
          },
        },
      });

      return {
        success: true,
        message: 'Product created successfully',
        data: product,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Get all products
  async getAllProducts(
    query: ProductQueryDto,
  ): Promise<ApiResponseType<ProductFormatResponseType[]>> {
    try {
      const products = await this.databaseService.product.findMany({
        include: {
          category: {
            select: {
              name: true,
            },
          },
          supplier: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return {
        success: true,
        message: 'Products fetched successfully',
        data: products,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Get product by ID
  async getProductById(
    id: number,
  ): Promise<ApiResponseType<ProductFormatResponseType>> {
    try {
      const product = await this.databaseService.product.findUnique({
        where: {
          id,
        },
        include: {
          category: true,
        },
      });

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      return {
        success: true,
        message: 'Product fetched successfully',
        data: product,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Update product by ID
  async updateProduct(
    id: number,
    data: UpdateProductDto,
  ): Promise<ApiResponseType<ProductFormatResponseType>> {
    try {
      // Check if product exists
      const existingProduct = await this.databaseService.product.findUnique({
        where: {
          id,
        },
      });

      if (!existingProduct) {
        throw new NotFoundException('Product not found');
      }

      // If SKU is being changed, check duplicate SKU
      if (data.sku && data.sku !== existingProduct.sku) {
        const skuExists = await this.databaseService.product.findUnique({
          where: {
            sku: data.sku,
          },
        });

        if (skuExists) {
          throw new ConflictException(
            'Product with the same SKU already exists',
          );
        }
      }

      const product = await this.databaseService.product.update({
        where: {
          id,
        },
        data,
        include: {
          category: true,
        },
      });

      return {
        success: true,
        message: 'Product updated successfully',
        data: product,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Delete product by ID
  async deleteProduct(id: number): Promise<ApiResponseType<null>> {
    try {
      // Check if product exists
      const existingProduct = await this.databaseService.product.findUnique({
        where: {
          id,
        },
      });

      if (!existingProduct) {
        throw new NotFoundException('Product not found');
      }

      await this.databaseService.product.delete({
        where: {
          id,
        },
      });

      return {
        success: true,
        message: 'Product deleted successfully',
        data: null,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

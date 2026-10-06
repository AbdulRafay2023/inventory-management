import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  //create a product
  @Post()
  createProduct(@Body() data: CreateProductDto) {
    return this.productService.createProduct(data);
  }

  //get all products
  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  //get product by id
  @Get(':id')
  getProductById(@Param('id') id: number) {
    return this.productService.getProductById(id);
  }

  //update product by id
  @Put(':id')
  updateProduct(@Param('id') id: number, @Body() data: UpdateProductDto) {
    return this.productService.updateProduct(id, data);
  }

  //delete product by id
  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }
}

import { CreateSupplierDto } from './dto/create-supplier.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SupplierService } from './supplier.service';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly SupplierService: SupplierService) {}

  //Create Supplier
  @Post()
  createSupplier(@Body() data: CreateSupplierDto) {
    return this.SupplierService.createSupplier(data);
  }

  //get all suppliers
  @Get()
  getAllSuppliers() {
    return this.SupplierService.getAllSuppliers();
  }

  //get supplier by id
  @Get(':id')
  getSupplierById(@Param('id') id: number) {
    return this.SupplierService.getSupplierById(id);
  }
}

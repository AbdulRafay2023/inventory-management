import { ConflictException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';

@Injectable()
export class SupplierService {
  constructor(private readonly databaseService: DatabaseService) {}

  // async createSupplier(data: CreateSupplierDto) {
  //   const existingSupplier = await this.databaseService.supplier.findUnique({
  //     where: {
  //       email: data.email,
  //     },
  //   });

  //   if (existingSupplier) {
  //     throw new ConflictException('Supplier email already exists');
  //   }

  //   return this.databaseService.supplier.create({
  //     data,
  //   });
  // }

  // async getAllSuppliers() {
  //   return this.databaseService.supplier.findMany({
  //     orderBy: {
  //       createdAt: 'desc',
  //     },
  //   });
  // }

  // async getSupplierById(id: number) {
  //   return this.databaseService.supplier.findUnique({
  //     where: {
  //       id,
  //     },
  //     include: {
  //       product: true,
  //     },
  //   });
  // }
}

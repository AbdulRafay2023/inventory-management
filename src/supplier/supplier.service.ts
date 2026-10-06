import { ConflictException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';

@Injectable()
export class SupplierService {
  constructor(private readonly databaseService: DatabaseService) {}

  // create supplier
  async createSupplier(data: CreateSupplierDto) {
    if (data.email) {
      const existingSupplier = await this.databaseService.supplier.findUnique({
        where: {
          email: data.email,
        },
      });

      if (existingSupplier) {
        throw new ConflictException('Supplier email already exist');
      }
    }

    return this.databaseService.supplier.create({
      data,
    });
  }

  // get all suppliers
  async getAllSuppliers() {
    return this.databaseService.supplier.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // get supplier by id
  async getSupplierById(id: number) {
    return this.databaseService.supplier.findUnique({
      where: {
        id,
      },
      include: {
        products: true,
      },
    });
  }
}

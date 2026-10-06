import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';

@Injectable()
export class SupplierService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createSupplier(data: CreateSupplierDto) {}

  async getAllSuppliers() {}

  async getSupplierById(id: number) {}
}

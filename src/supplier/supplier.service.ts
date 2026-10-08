import { ConflictException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';

@Injectable()
export class SupplierService {
  constructor(private readonly databaservice: DatabaseService) {}

  //create supplier
  // async createSupplier(data: CreateSupplierDto) {
  //   if (data.email) {
  //     const existingSupplier = await this.databaservice.supplier.findUnique({
  //       where: {
  //         email: data.email,
  //       },
  //     });

  //     if (existingSupplier) {
  //       throw new ConflictException('Supplier email already exist');
  //     }
  //   }

  //   const supplier = await this.databaservice.supplier.create({
  //     data,
  //   });

  //   return {
  //     supplier,
  //   };
  // }
}

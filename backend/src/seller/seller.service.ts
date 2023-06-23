import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { Seller } from './seller.model';
import { DB, Collection } from '@tigrisdata/core';
import { TigrisDBService } from 'src/db/tigris';

import { LoggingService } from 'src/modules/logging/logging.service';

@Injectable()
export class SellerService {
  private readonly tigrisDB: DB;
  private readonly sellerCollection: Collection<Seller>;

  constructor(private readonly loggingService: LoggingService) {
    this.tigrisDB = TigrisDBService.getTigrisDB();
    this.sellerCollection = this.tigrisDB.getCollection<Seller>('Seller');
  }

  async create(
    email: string,
    createSellerDto: CreateSellerDto,
  ): Promise<boolean> {
    try {
      const { name, entryDate } = createSellerDto;
      const seller: Seller = {
        name,
        email,
        entryDate,
      };
      const newSeller = await this.sellerCollection.insertOne(seller);
      const logMessage = `Seller created (Service): ${newSeller.id}`;
      this.loggingService.log('info', logMessage);
      return true;
    } catch (err) {
      const errorMessage = `Error creating seller (Service): ${email}`;
      this.loggingService.log('error', errorMessage);
      return false;
    }
  }

  async getCurrentSeller(email: string): Promise<Seller> {
    const seller: Seller | undefined = await this.sellerCollection.findOne({
      filter: { email },
    });

    if (seller) {
      const logMessage = `Seller Found (Service): ${seller.email}`;
      this.loggingService.log('info', logMessage);
      return seller;
    } else {
      const errorMessage = `Seller not Found (Service): ${email}`;
      this.loggingService.log('error', errorMessage);
      throw new NotFoundException('Seller not found');
    }
  }
}

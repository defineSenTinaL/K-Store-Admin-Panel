import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { Seller } from './seller.model';
import { DB, Collection } from '@tigrisdata/core';
import { TigrisDBService } from 'src/db/tigris';

@Injectable()
export class SellerService {
  private readonly tigrisDB: DB;
  private readonly sellerCollection: Collection<Seller>;

  constructor() {
    this.tigrisDB = TigrisDBService.getTigrisDB();
    this.sellerCollection = this.tigrisDB.getCollection<Seller>('Seller');
  }

  async createUpdate(
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
      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getCurrentSeller(email: string): Promise<Seller> {
    const seller = await this.sellerCollection.findOne({ filter: { email } });
    //console.log(seller);
    if (seller) {
      return seller;
    } else {
      throw new NotFoundException('Seller not found');
    }
  }
}

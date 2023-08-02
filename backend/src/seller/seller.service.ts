import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { Seller, SellerDocument } from './seller.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SellerService {
  constructor(
    @InjectModel(Seller.name)
    private readonly sellerModel: Model<SellerDocument>,
  ) {}
  async createSeller(
    createSellerDto: CreateSellerDto,
  ): Promise<SellerDocument> {
    // Generate the slug from the category name using slugify
    const newSeller = new this.sellerModel(createSellerDto);
    return newSeller.save();
  }

  async getCurrentSeller(email: string): Promise<SellerDocument | null> {
    return this.sellerModel.findOne({ email }).exec();
  }
}

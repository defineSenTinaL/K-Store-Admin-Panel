import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coupon, CouponDocument } from './coupon.schema';

@Injectable()
export class CouponService {
  constructor(
    @InjectModel(Coupon.name) private couponModel: Model<CouponDocument>,
  ) {}

  async createCoupon(data: Partial<Coupon>): Promise<CouponDocument> {
    const createdCoupon = new this.couponModel(data);
    return createdCoupon.save();
  }

  async getCoupons(): Promise<CouponDocument[]> {
    return this.couponModel.find().exec();
  }

  // Add more methods as needed: updateCoupon, deleteCoupon, etc.
}

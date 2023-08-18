import { Controller, Get, Post, Body } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponDocument } from './coupon.schema';

@Controller('coupon')
export class CouponController {
  constructor(private couponService: CouponService) {}

  @Post()
  async createCoupon(
    @Body() data: Partial<CouponDocument>,
  ): Promise<CouponDocument> {
    return this.couponService.createCoupon(data);
  }

  @Get()
  async getCoupons(): Promise<CouponDocument[]> {
    return this.couponService.getCoupons();
  }

  // Add more routes as needed: updateCoupon, deleteCoupon, etc.
}

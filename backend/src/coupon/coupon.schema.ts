import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'Coupon' }) // Set the collection name for the Coupon collection
export class Coupon {
  @Prop({ required: true })
  couponName: string;

  @Prop()
  couponPercent: number;

  @Prop()
  couponAmount: number;

  @Prop({ required: true })
  minAmountRequired: number;

  @Prop({ required: true, type: Date }) // Expiry date field
  expiryDate: Date;
}

export type CouponDocument = Coupon & Document;
export const CouponSchema = SchemaFactory.createForClass(Coupon);

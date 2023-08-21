import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface SellerDocument extends Document {
  name: string;
  email: string;
}

@Schema({ _id: false })
export class Address {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  mobile: number;

  @Prop({ type: String, required: true })
  addressLine: string;

  @Prop({ type: String, required: true })
  street: string;

  @Prop({ type: String, required: true })
  city: string;

  @Prop({ type: String, required: true })
  state: string;

  @Prop({ type: String, required: true })
  pincode: string;

  @Prop({ type: String, required: true })
  addressType: string;
}

@Schema({ _id: false })
export class TaxInformation {
  @Prop({ type: String, required: true })
  gstNumber: string;

  @Prop({ type: String, required: true })
  gstState: string;
}

@Schema({ timestamps: true, collection: 'Seller' })
export class Seller {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true }) // Add the slug field and ensure it's unique
  email: string;

  @Prop({ required: true, unique: true }) // Add the slug field and ensure it's unique
  mobile: number;

  @Prop({ unique: true }) // Add the slug field and ensure it's unique
  landline: number;

  @Prop({ type: Address, required: true })
  invoiceAddress: Address;

  @Prop({ type: Address, required: true })
  returnAddress: Address;

  @Prop({ type: TaxInformation, required: true })
  taxInformation: TaxInformation;
}

export const SellerSchema = SchemaFactory.createForClass(Seller);

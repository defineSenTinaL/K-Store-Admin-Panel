import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Define the interface for the Category Document (MongoDB document)
export interface SellerDocument extends Document {
  name: string;
  email: string;
}

@Schema({ timestamps: true, collection: 'Seller' })
export class Seller {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true }) // Add the slug field and ensure it's unique
  email: string;
}

export const SellerSchema = SchemaFactory.createForClass(Seller);

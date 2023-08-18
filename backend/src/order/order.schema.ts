import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type ObjectId = MongooseSchema.Types.ObjectId;

@Schema({ _id: false }) // Add _id: false to prevent Mongoose from creating a separate _id for the Product subdocument
export class Product {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true })
  returnPeriodInDays: number;

  @Prop({ type: Date })
  deliveryDate: Date;
}

// Convert the Product class into a Mongoose schema
export const ProductSchema = SchemaFactory.createForClass(Product);

@Schema({ _id: false })
export class Address {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
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
export class DiscountCoupon {
  @Prop({ type: Types.ObjectId, required: false })
  couponId: Types.ObjectId;

  @Prop({ type: String, required: false })
  couponName: string;

  @Prop({ type: Number, required: false })
  couponPercent: number;

  @Prop({ type: Number, required: false })
  couponAmount: number;

  @Prop({ type: Number, required: false })
  minAmountRequired: number;
}

export enum OrderStatus {
  Placed = 'Placed',
  Processing = 'Processing',
  Packed = 'Packed',
  OutForDelivery = 'Out_for_delivery',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
}

export enum PaymentMethod {
  Online = 'Prepaid',
  CashOnDelivery = 'COD',
}

@Schema({ timestamps: true, collection: 'Order' }) // Add _id: false to prevent Mongoose from creating a separate _id for the Order documents
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId; // The ObjectId of the user who placed the order

  @Prop({ type: Address, required: true })
  shippingAddress: Address;

  @Prop({ required: true, default: OrderStatus.Placed, enum: OrderStatus })
  status: OrderStatus;

  @Prop({ required: true, enum: PaymentMethod })
  paymentMethod: PaymentMethod;

  @Prop({ required: true })
  orderId: string;

  @Prop({ required: true })
  transactionId: string;

  @Prop({ type: [ProductSchema], required: true }) // Use the Mongoose schema for the Product subdocument
  products: Product[];

  @Prop({ type: DiscountCoupon })
  discountCoupon?: DiscountCoupon;

  @Prop({ default: 0 })
  orderTotal: number;

  @Prop({ default: 0 })
  total: number;

  @Prop()
  order_id: number;

  @Prop()
  shipment_id: number;

  @Prop()
  manifest_url: string;

  @Prop()
  label_url: string;

  @Prop({ default: false })
  isCancelled: boolean;

  @Prop()
  cancellationDate: Date;

  @Prop({ default: false })
  isReturnRequested: boolean;

  @Prop()
  returnRequestDate: Date;

  @Prop({ default: false })
  returnAccepted: boolean;

  @Prop({ default: false })
  returnRejected: boolean;

  @Prop({ default: false })
  returnedItemReceived: boolean;

  @Prop()
  returnedItemReceivedDate: Date;

  @Prop()
  returnReason: string;

  @Prop({ default: false })
  returnCancelled: boolean;

  @Prop()
  return_order_id: string;

  @Prop()
  return_shipment_id: string;

  @Prop()
  returnId: string;

  @Prop({ type: Object }) // Use the appropriate type for the pickup response
  pickupDetail: any;

  @Prop({ default: false })
  cancelledItemReceived: boolean;

  @Prop()
  cancelledItemReceivedDate: Date;

  @Prop()
  cancellationReason: string;
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);

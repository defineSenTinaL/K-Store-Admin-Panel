import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { CategoryDocument } from 'src/category/category.schema';
import { SubCategoryDocument } from 'src/category/category.schema';
import { SubSubCategoryDocument } from 'src/category/category.schema';

export type ObjectId = MongooseSchema.Types.ObjectId;

// Define the interface for the Image object
export interface Image {
  url: string;
  fileId: string;
}

// Define the interface for the Product Dimension object
export interface ProductDimension {
  length: number;
  breadth: number;
  height: number;
}

// Define the interface for the Package Dimension object
export interface PackageDimension {
  length: number;
  breadth: number;
  height: number;
}

//Define the interface for the Variance object
export interface Variance {
  color: string;
  quantity: number;
  size: string;
  style: string;
  material: string;
  price: number;
}

// Define the interface for the Product Document (MongoDB document)
export interface ProductDocument extends Document {
  title: string;
  slug: string;
  image: Image[];
  productDimension: ProductDimension;
  count: number;
  component: string[];
  fragile: string;
  packageDimension: PackageDimension;
  packageWeight: number;
  category: CategoryDocument['_id']; // Reference to Category model
  subcategory: SubCategoryDocument['_id']; // Reference to Subcategory model
  subsubcategory: SubSubCategoryDocument['_id']; // Reference to SubsubCategory model
  brand: string;
  manufacturer: string;
  manufacturerDetail: string;
  manufacturerPartNumber: string;
  warranty: string;
  mrp: number;
  price: number;
  description: string;
  bullet: string[];
  color: string;
  material: string;
  quantity: number;
  sold: number; // It should be by default 0, you can set this default value in the schema
  kharidi: number;
  asin: string;
  sku: string;
  gst: number;
  state: string;
  gift: string;
  origin: string;
  hsn: number;
  keyword: string[];
  weight: number;
  shape: string;
  model: string;
  style: string;
  size: string;
  delivery: string;
  return: string;
}

@Schema({ timestamps: true, collection: 'Product' })
export class Product {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop([
    {
      url: { type: String, required: true },
      fileId: { type: String, required: true },
    },
  ])
  image: Image[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category' })
  category: ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'SubCategory' })
  subCategory: ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'SubSubCategory' })
  subSubCategory: ObjectId;

  @Prop({ required: true, type: Object })
  productDimension: ProductDimension;

  @Prop({ required: true })
  count: number;

  @Prop({ required: true })
  component: string[];

  @Prop({ required: true })
  fragile: string;

  @Prop({ required: true, type: Object })
  packageDimension: PackageDimension;

  @Prop()
  packageWeight: number;

  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  manufacturer: string;

  @Prop()
  manufacturerDetail: string;

  @Prop()
  manufacturerPartNumber: string;

  @Prop({ required: true })
  warranty: string;

  @Prop({ required: true })
  mrp: number;

  @Prop()
  price: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: [String] })
  bullet: string[];

  @Prop()
  color: string;

  @Prop()
  material: string;

  @Prop()
  quantity: number;

  @Prop({ default: 0 })
  sold: number;

  @Prop({ required: true })
  kharidi: number;

  @Prop({ required: true })
  asin: string;

  @Prop({ required: true })
  sku: string;

  @Prop({ required: true })
  gst: number;

  @Prop()
  state: string;

  @Prop({ required: true })
  gift: string;

  @Prop({ required: true })
  origin: string;

  @Prop({ required: true })
  hsn: number;

  @Prop({ required: true, type: [String] })
  keyword: string[];

  @Prop()
  weight: number;

  @Prop()
  shape: string;

  @Prop()
  model: string;

  @Prop()
  style: string;

  @Prop()
  size: string;

  @Prop({ required: true })
  delivery: string;

  @Prop({ required: true })
  return: string;

  @Prop([
    {
      color: { type: String, required: true },
      quantity: { type: Number, required: true },
      size: { type: String, required: true },
      style: { type: String, required: true },
      material: { type: String, required: true },
      // price: { type: Number, required: true },
      // kharidi: { type: Number, required: true },
    },
  ])
  variance: Variance[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);

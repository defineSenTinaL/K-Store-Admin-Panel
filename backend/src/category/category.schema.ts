import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

// Import the ObjectId type from mongoose
export type ObjectId = MongooseSchema.Types.ObjectId;

// Define the interface for the Category Document (MongoDB document)
export interface CategoryDocument extends Document {
  name: string;
  slug: string;
}

@Schema({ timestamps: true, collection: 'Category' })
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true }) // Add the slug field and ensure it's unique
  slug: string;

  @Prop({ required: true })
  image: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

// Define the interface for the Subcategory Document (MongoDB document)
export interface SubCategoryDocument extends Document {
  name: string;
  slug: string;
  parentId: ObjectId; // Reference to Category model
}

@Schema({ timestamps: true, collection: 'SubCategory' })
export class SubCategory {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true }) // Add the slug field and ensure it's unique
  slug: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category' }) // Reference to Category model
  parentId: ObjectId;
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);

// Define the interface for the SubsubCategory Document (MongoDB document)
export interface SubSubCategoryDocument extends Document {
  name: string;
  slug: string;
  parentId: ObjectId; // Reference to Subcategory model
}

@Schema({ timestamps: true, collection: 'SubSubCategory' })
export class SubSubCategory {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true }) // Add the slug field and ensure it's unique
  slug: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'SubCategory' }) // Reference to Subcategory model
  parentId: ObjectId;
}

export const SubSubCategorySchema =
  SchemaFactory.createForClass(SubSubCategory);

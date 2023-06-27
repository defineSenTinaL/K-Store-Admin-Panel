import {
  Field,
  PrimaryKey,
  TigrisCollection,
  TigrisDataTypes,
} from '@tigrisdata/core';

export class ProductDimension {
  @Field()
  length: number;

  @Field()
  breadth: number;

  @Field()
  height: number;
}

export class PackageDimension {
  @Field()
  length: number;

  @Field()
  breadth: number;

  @Field()
  height: number;
}

@TigrisCollection('Product')
export class Product {
  @PrimaryKey(TigrisDataTypes.UUID, { order: 1, autoGenerate: true })
  id?: string;

  @Field()
  title: string;

  @Field()
  brand: string;

  @Field()
  manufacturer: string;

  @Field()
  manufacturerPartNumber: string;

  @Field()
  warranty: string;

  @Field()
  mrp: number;

  @Field()
  price: number;

  @Field()
  description: string;

  @Field({ elements: TigrisDataTypes.STRING })
  bullet: Array<string>;

  @Field()
  color: string;

  @Field()
  material: string;

  @Field()
  quantity: number;

  @Field({ default: 0 })
  sold: number;

  @Field()
  kharidi: number;

  @Field()
  category: string;

  @Field()
  subCategory: string;

  @Field()
  subSubCategory: string;

  @Field({ elements: TigrisDataTypes.STRING })
  image: Array<string>;

  @Field()
  asin: string;

  @Field()
  sku: string;

  @Field()
  gst: number;

  // new or used
  @Field()
  conditon: string;

  //gift wrap
  @Field()
  gift: string;

  @Field()
  origin: string;

  @Field()
  hsn: number;

  @Field({ elements: TigrisDataTypes.STRING })
  keyword: Array<string>;

  @Field()
  weight: number;

  @Field({ elements: ProductDimension })
  productDimension: Array<ProductDimension>;

  //number of things in box
  @Field()
  count: number;

  // what comes with box
  @Field({ elements: TigrisDataTypes.STRING })
  component: Array<string>;

  @Field()
  fragile: string;

  @Field({ elements: PackageDimension })
  packageDimension: Array<PackageDimension>;

  @Field()
  packageWeight: number;

  @Field()
  shape: string;

  @Field()
  model: string;

  @Field()
  style: string;

  // delivery time
  @Field()
  delivery: string;

  @Field({ elements: TigrisDataTypes.STRING })
  return: Array<string>;
}

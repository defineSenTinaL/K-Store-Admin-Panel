import {
  Field,
  PrimaryKey,
  TigrisCollection,
  TigrisDataTypes,
} from '@tigrisdata/core';

export class ProductAttributes {
  @Field()
  name: string;

  @Field()
  value: string;
}

@TigrisCollection('Product')
export class Product {
  @PrimaryKey(TigrisDataTypes.INT64, { order: 1, autoGenerate: true })
  id?: string;

  @Field()
  name: string;

  @Field()
  price: number;
}

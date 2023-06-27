import {
  Field,
  PrimaryKey,
  TigrisCollection,
  TigrisDataTypes,
} from '@tigrisdata/core';

@TigrisCollection('Category')
export class Category {
  @PrimaryKey(TigrisDataTypes.UUID, { order: 1, autoGenerate: true })
  id?: string;

  @Field()
  name: string;

  @Field({ index: true })
  slug: string;

  @Field({ timestamp: 'createdAt' })
  entryDate?: Date;

  @Field({ timestamp: 'updatedAt' })
  updatedAt?: Date;
}

@TigrisCollection('SubCategory')
export class SubCategory {
  @PrimaryKey(TigrisDataTypes.UUID, { order: 1, autoGenerate: true })
  id?: string;

  @Field(TigrisDataTypes.UUID)
  parentId: string;

  @Field()
  name: string;

  @Field({ index: true })
  slug: string;

  @Field({ timestamp: 'createdAt' })
  entryDate?: Date;

  @Field({ timestamp: 'updatedAt' })
  updatedAt?: Date;
}

@TigrisCollection('SubSubCategory')
export class SubSubCategory {
  @PrimaryKey(TigrisDataTypes.UUID, { order: 1, autoGenerate: true })
  id?: string;

  @Field(TigrisDataTypes.UUID)
  parentId: string;

  @Field()
  name: string;

  @Field({ index: true })
  slug: string;

  @Field({ timestamp: 'createdAt' })
  entryDate?: Date;

  @Field({ timestamp: 'updatedAt' })
  updatedAt?: Date;
}

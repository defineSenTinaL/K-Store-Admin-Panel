import {
  Field,
  PrimaryKey,
  TigrisCollection,
  TigrisDataTypes,
} from '@tigrisdata/core';

@TigrisCollection('Seller')
export class Seller {
  @PrimaryKey(TigrisDataTypes.STRING, { order: 1, autoGenerate: true })
  id?: string;

  @Field({ index: true })
  email: string;

  @Field()
  name: string;

  @Field({ timestamp: 'createdAt' })
  entryDate: Date;
}

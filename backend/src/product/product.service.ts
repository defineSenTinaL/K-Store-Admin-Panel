import { Injectable, Inject } from '@nestjs/common';
import { Product } from './product.model';
import { DB, Collection } from '@tigrisdata/core';
import { TigrisDBService } from 'src/db/tigris';

@Injectable()
export class ProductService {
  private readonly tigrisDB: DB;
  private readonly productCollection: Collection<Product>;
  constructor() {
    this.tigrisDB = TigrisDBService.getTigrisDB();
    this.productCollection = this.tigrisDB.getCollection<Product>(Product);
  }

  async getAllProducts(): Promise<Product[]> {
    const cursor = this.productCollection.findMany();
    return cursor.toArray();
  }

  async createProduct(product: Product): Promise<Product> {
    try {
      const insertResult = await this.productCollection.insertOne(product);
      return insertResult;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

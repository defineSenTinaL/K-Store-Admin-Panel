import { Injectable } from '@nestjs/common';
import { Product } from './product.model';
import { DB, Collection } from '@tigrisdata/core';
import { TigrisDBService } from 'src/db/tigris';
import { LoggingService } from 'src/modules/logging/logging.service';

@Injectable()
export class ProductService {
  private readonly tigrisDB: DB;
  private readonly productCollection: Collection<Product>;
  constructor(private readonly loggingService: LoggingService) {
    this.tigrisDB = TigrisDBService.getTigrisDB();
    this.productCollection = this.tigrisDB.getCollection<Product>(Product);
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      const products = await this.productCollection.findMany();
      const logMessage = `All Products Retrieved from database (Service): ${products}`;
      this.loggingService.log('info', logMessage);
      return products.toArray();
    } catch (error) {
      const errorMessage = `Error getting all products from database (Service): ${error.message}`;
      this.loggingService.log('error', errorMessage);
      throw new Error(errorMessage);
    }
  }

  async createProduct(product: Product): Promise<Product> {
    try {
      const insertResult = await this.productCollection.insertOne(product);
      const logMessage = `Product Added Succesfully to database (Service): ${insertResult}`;
      this.loggingService.log('info', logMessage);
      return insertResult;
    } catch (error) {
      const errorMessage = `Error adding product to database (Service): ${error.message}`;
      this.loggingService.log('error', errorMessage);
      throw new Error(error.message);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { Product } from './product.model';
import { DB, Collection } from '@tigrisdata/core';
import { TigrisDBService } from 'src/db/tigris';
import { LoggingService } from 'src/modules/logging/logging.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ImageKitService } from 'src/image/imagekit.service';

@Injectable()
export class ProductService {
  private readonly tigrisDB: DB;
  private readonly productCollection: Collection<Product>;
  constructor(
    private readonly loggingService: LoggingService,
    private readonly imageKitService: ImageKitService,
  ) {
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

  async createProduct(
    createProductDto: CreateProductDto,
    files: Express.Multer.File[],
  ): Promise<Product> {
    try {
      const uploadResults = await this.imageKitService.uploadFiles(files);
      console.log(uploadResults);

      // Update the createProductDto with the uploaded image URLs
      //createProductDto.image = uploadResults.map((result) => result.url);

      // const insertResult = await this.productCollection.insertOne(
      //   createProductDto,
      // );
      // const logMessage = `Product Added Successfully to database (Service): ${insertResult}`;
      // this.loggingService.log('info', logMessage);

      return createProductDto;
    } catch (error) {
      const errorMessage = `Error adding product to database (Service): ${error.message}`;
      this.loggingService.log('error', errorMessage);
      throw new Error(error.message);
    }
  }
}

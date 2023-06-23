import { Injectable } from '@nestjs/common';
import { Tigris } from '@tigrisdata/core';
import {
  Category,
  SubCategory,
  SubSubCategory,
} from 'src/category/category.model';
import { LoggingService } from 'src/modules/logging/logging.service';
import { Product } from 'src/product/product.model';
import { Seller } from 'src/seller/seller.model';

@Injectable()
export class TigrisSetupService {
  constructor(private readonly loggingService: LoggingService) {}
  async setupTigris(): Promise<void> {
    try {
      // setup client
      const tigrisClient = new Tigris();
      // ensure branch exists, create it if it needs to be created dynamically
      await tigrisClient.getDatabase().initializeBranch();
      // register schemas
      await tigrisClient.registerSchemas([
        Seller,
        Product,
        Category,
        SubCategory,
        SubSubCategory,
      ]);
      const logMessage = 'Tigris setup completed successfully';
      this.loggingService.log('info', logMessage);
      console.log('Setup complete...');
      process.exit(0);
    } catch (error) {
      const errorMessage = `Error setting up Tigris: ${error.message}`;
      this.loggingService.log('error', errorMessage);
      console.error(error);
      process.exit(1);
    }
  }
}

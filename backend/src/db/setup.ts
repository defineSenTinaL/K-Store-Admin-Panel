import { Injectable } from '@nestjs/common';
import { Tigris } from '@tigrisdata/core';
import { Product } from 'src/product/product.model';

@Injectable()
export class TigrisSetupService {
  async setupTigris(): Promise<void> {
    try {
      // setup client
      const tigrisClient = new Tigris();
      // ensure branch exists, create it if it needs to be created dynamically
      await tigrisClient.getDatabase().initializeBranch();
      // register schemas
      await tigrisClient.registerSchemas([Product]);
      console.log('Setup complete...');
      process.exit(0);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }
}

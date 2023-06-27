import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { LoggingModule } from 'src/modules/logging/logging.module';
import { ImageKitModule } from 'src/image/imagekit.module';
import { ImageKitService } from 'src/image/imagekit.service';

@Module({
  imports: [LoggingModule, ImageKitModule],
  controllers: [ProductController],
  providers: [ProductService, ImageKitService], // Add ProductService to the providers array
})
export class ProductModule {}

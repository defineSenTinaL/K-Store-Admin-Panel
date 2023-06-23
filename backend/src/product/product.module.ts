import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { LoggingModule } from 'src/modules/logging/logging.module';

@Module({
  imports: [LoggingModule],
  controllers: [ProductController],
  providers: [ProductService, LoggingModule], // Add ProductService to the providers array
})
export class ProductModule {}

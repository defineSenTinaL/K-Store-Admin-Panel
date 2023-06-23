import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { LoggingModule } from 'src/modules/logging/logging.module';
import { CategoryExceptionFilter } from 'src/filters/category-exception-filter';

@Module({
  imports: [LoggingModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryExceptionFilter],
})
export class CategoryModule {}

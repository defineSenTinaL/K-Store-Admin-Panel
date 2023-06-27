import { Module } from '@nestjs/common';
import {
  CategoryService,
  SubCategoryService,
  SubSubCategoryService,
} from './category.service';
import {
  CategoryController,
  SubCategoryController,
  SubSubCategoryController,
} from './category.controller';
import { LoggingModule } from 'src/modules/logging/logging.module';
import { CategoryExceptionFilter } from 'src/filters/category-exception-filter';

@Module({
  imports: [LoggingModule],
  controllers: [
    CategoryController,
    SubCategoryController,
    SubSubCategoryController,
  ],
  providers: [
    CategoryService,
    SubCategoryService,
    SubSubCategoryService,
    CategoryExceptionFilter,
  ],
})
export class CategoryModule {}

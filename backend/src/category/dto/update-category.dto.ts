import { PartialType } from '@nestjs/mapped-types';
import {
  CreateCategoryDto,
  CreateSubCategoryDto,
  CreateSubSubCategoryDto,
} from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

export class UpdateSubCategoryDto extends PartialType(CreateSubCategoryDto) {}

export class UpdateSubSubCategoryDto extends PartialType(
  CreateSubSubCategoryDto,
) {}

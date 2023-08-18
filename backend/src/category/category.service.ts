import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateCategoryDto,
  CreateSubCategoryDto,
  CreateSubSubCategoryDto,
} from './dto/create-category.dto';
import {
  UpdateCategoryDto,
  UpdateSubCategoryDto,
  UpdateSubSubCategoryDto,
} from './dto/update-category.dto';
import {
  Category,
  CategoryDocument,
  SubCategory,
  SubCategoryDocument,
  SubSubCategory,
  SubSubCategoryDocument,
} from './category.schema';

import slugify from 'slugify';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}
  // Category
  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryDocument> {
    const { name, image } = createCategoryDto;
    // Generate the slug from the category name using slugify
    const slug = slugify(name, { lower: true, trim: true });

    const newCategory = new this.categoryModel({
      name,
      slug,
      image,
    });
    return newCategory.save();
  }

  async getAllCategory(): Promise<CategoryDocument[]> {
    return this.categoryModel.find().exec();
  }
}

//Sub Category
@Injectable()
export class SubCategoryService {
  constructor(
    @InjectModel(SubCategory.name)
    private readonly subCategoryModel: Model<SubCategoryDocument>,
  ) {}

  async createSubCategory(
    createSubCategoryDto: CreateSubCategoryDto, // Pass the ID of the associated Category
  ): Promise<SubCategoryDocument> {
    const { name, parentId } = createSubCategoryDto;

    // Generate the slug from the subcategory name using slugify
    const slug = slugify(name, { lower: true, trim: true });

    // If the slug does not exist, create the subcategory with the name, slug, and associated Category ID
    const newSubCategory = new this.subCategoryModel({
      name,
      slug,
      parentId,
    });
    return newSubCategory.save();
  }

  async getAllSubCategory(): Promise<CategoryDocument[]> {
    return this.subCategoryModel.find().exec();
  }
}

@Injectable()
export class SubSubCategoryService {
  constructor(
    @InjectModel(SubSubCategory.name)
    private readonly subSubCategoryModel: Model<SubSubCategoryDocument>,
  ) {}

  async createSubSubCategory(
    createSubSubCategoryDto: CreateSubSubCategoryDto, // Pass the ID of the associated SubCategory
  ): Promise<SubSubCategoryDocument> {
    const { name, parentId } = createSubSubCategoryDto;

    // Generate the slug from the subsubcategory name using slugify
    const slug = slugify(name, { lower: true, trim: true });

    // If the slug does not exist, create the subsubcategory with the name, slug, and associated SubCategory ID
    const newSubSubCategory = new this.subSubCategoryModel({
      name,
      slug,
      parentId,
    });
    return newSubSubCategory.save();
  }

  async getAllSubSubCategory(): Promise<CategoryDocument[]> {
    return this.subSubCategoryModel.find().exec();
  }
}

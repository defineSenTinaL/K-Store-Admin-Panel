import { Injectable, NotFoundException } from '@nestjs/common';
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
import { DB, Collection } from '@tigrisdata/core';
import { TigrisDBService } from 'src/db/tigris';
import { LoggingService } from 'src/modules/logging/logging.service';
import { Category, SubCategory, SubSubCategory } from './category.model';
import slugify from 'slugify';

@Injectable()
export class CategoryService {
  private readonly tigrisDB: DB;
  private readonly categoryCollection: Collection<Category>;

  constructor(private readonly loggingService: LoggingService) {
    this.tigrisDB = TigrisDBService.getTigrisDB();
    this.categoryCollection = this.tigrisDB.getCollection<Category>(Category);
  }

  // Category
  async createCategory(createCategoryDto: CreateCategoryDto) {
    try {
      const slug = slugify(createCategoryDto.name, { lower: true });
      const categoryWithSlug = { ...createCategoryDto, slug };
      const existingCategory = await this.categoryCollection.findOne({
        filter: { slug },
      });
      if (existingCategory) {
        return { message: 'Category with the same slug already exists' };
      }
      const insertCategory = await this.categoryCollection.insertOne(
        categoryWithSlug,
      );
      const logMessage = `Category Added Succesfully to database (Service): ${insertCategory}`;
      this.loggingService.log('info', logMessage);
      return insertCategory;
    } catch (error) {
      const errorMessage = `Error adding Category to database (Service): ${error.message}`;
      this.loggingService.log('error', errorMessage);
      throw new Error(error.message);
    }
  }

  async listCategory() {
    try {
      const categoryCursor = await this.categoryCollection.findMany();
      const categories = [];
      for await (const category of categoryCursor) {
        categories.push(category);
      }
      return categories;
    } catch (error) {
      // Handle the error and return an appropriate response
      throw new NotFoundException('Failed to fetch categories');
    }
  }

  async listOneCategory(slug: string) {
    try {
      const category = await this.categoryCollection.findOne({
        filter: { slug },
      });
      return category;
    } catch (error) {
      throw new NotFoundException('Failed to fetch category');
    }
  }

  async updateCategory(slug: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const categoryToUpdate = { ...updateCategoryDto };
      if (updateCategoryDto.name) {
        const slug = slugify(updateCategoryDto.name, { lower: true });
        categoryToUpdate.slug = slug;
      }
      const category = await this.categoryCollection.updateOne({
        filter: { slug },
        fields: categoryToUpdate,
      });
      return category;
    } catch (error) {
      throw new NotFoundException('Failed to update category');
    }
  }

  async removeCategory(slug: string) {
    try {
      const category = await this.categoryCollection.deleteOne({
        filter: { slug },
      });
      return category;
    } catch (error) {
      throw new NotFoundException('Failed to delete category');
    }
  }
}
@Injectable()
export class SubCategoryService {
  private readonly tigrisDB: DB;
  private readonly subCategoryCollection: Collection<SubCategory>;

  constructor(private readonly loggingService: LoggingService) {
    this.tigrisDB = TigrisDBService.getTigrisDB();
    this.subCategoryCollection =
      this.tigrisDB.getCollection<SubCategory>(SubCategory);
  }

  async createSubCategory(createSubCategoryDto: CreateSubCategoryDto) {
    try {
      const slug = slugify(createSubCategoryDto.name, { lower: true });
      const subCategoryWithSlug = { ...createSubCategoryDto, slug };
      const existingSubCategory = await this.subCategoryCollection.findOne({
        filter: { slug },
      });
      if (existingSubCategory) {
        return { message: 'Sub Category with the same slug already exists' };
      }
      const insertSubCategory = await this.subCategoryCollection.insertOne(
        subCategoryWithSlug,
      );
      // const logMessage = `Sub Category Added Succesfully to database (Service): ${insertSubCategory}`;
      // this.loggingService.log('info', logMessage);
      return insertSubCategory;
    } catch (error) {
      const errorMessage = `Error adding Sub Category to database (Service): ${error.message}`;
      this.loggingService.log('error', errorMessage);
      throw new Error(error.message);
    }
  }

  async listSubCategory() {
    try {
      const subCategoryCursor = await this.subCategoryCollection.findMany();
      const subCategories = [];
      for await (const category of subCategoryCursor) {
        subCategories.push(category);
      }
      return subCategories;
    } catch (error) {
      // Handle the error and return an appropriate response
      throw new NotFoundException('Failed to fetch Sub Categories');
    }
  }

  async listOneSubCategory(slug: string) {
    try {
      const subCategory = await this.subCategoryCollection.findOne({
        filter: { slug },
      });
      return subCategory;
    } catch (error) {
      throw new NotFoundException('Failed to fetch Sub Category');
    }
  }

  async updateSubCategory(
    slug: string,
    updateSubCategoryDto: UpdateSubCategoryDto,
  ) {
    try {
      const subCategoryToUpdate = { ...updateSubCategoryDto };
      if (updateSubCategoryDto.name) {
        const slug = slugify(updateSubCategoryDto.name, { lower: true });
        subCategoryToUpdate.slug = slug;
      }
      const subCategory = await this.subCategoryCollection.updateOne({
        filter: { slug },
        fields: subCategoryToUpdate,
      });
      return subCategory;
    } catch (error) {
      throw new NotFoundException('Failed to update Sub Category');
    }
  }

  async removeSubCategory(slug: string) {
    try {
      const subCategory = await this.subCategoryCollection.deleteOne({
        filter: { slug },
      });
      return subCategory;
    } catch (error) {
      throw new NotFoundException('Failed to delete Sub Category');
    }
  }
}

@Injectable()
export class SubSubCategoryService {
  private readonly tigrisDB: DB;
  private readonly subSubCategoryCollection: Collection<SubSubCategory>;

  constructor(private readonly loggingService: LoggingService) {
    this.tigrisDB = TigrisDBService.getTigrisDB();
    this.subSubCategoryCollection =
      this.tigrisDB.getCollection<SubSubCategory>(SubSubCategory);
  }
  async createSubSubCategory(createSubSubCategoryDto: CreateSubSubCategoryDto) {
    try {
      const slug = slugify(createSubSubCategoryDto.name, { lower: true });
      const subSubCategoryWithSlug = { ...createSubSubCategoryDto, slug };
      const existingSubSubCategory =
        await this.subSubCategoryCollection.findOne({
          filter: { slug },
        });
      if (existingSubSubCategory) {
        return { message: 'SubSub Category with the same slug already exists' };
      }
      const insertSubSubCategory =
        await this.subSubCategoryCollection.insertOne(subSubCategoryWithSlug);
      // const logMessage = `SubSub Category Added Succesfully to database (Service): ${insertSubSubCategory}`;
      // this.loggingService.log('info', logMessage);
      return insertSubSubCategory;
    } catch (error) {
      const errorMessage = `Error adding SubSub Category to database (Service): ${error.message}`;
      this.loggingService.log('error', errorMessage);
      throw new Error(error.message);
    }
  }

  async listSubSubCategory() {
    try {
      const subSubCategoryCursor =
        await this.subSubCategoryCollection.findMany();
      const subSubCategories = [];
      for await (const category of subSubCategoryCursor) {
        subSubCategories.push(category);
      }
      return subSubCategories;
    } catch (error) {
      // Handle the error and return an appropriate response
      throw new NotFoundException('Failed to fetch SubSub Categories');
    }
  }

  async listOneSubSubCategory(slug: string) {
    try {
      const subSubCategory = await this.subSubCategoryCollection.findOne({
        filter: { slug },
      });
      return subSubCategory;
    } catch (error) {
      throw new NotFoundException('Failed to fetch SubSub Category');
    }
  }

  async updateSubSubCategory(
    slug: string,
    updateSubSubCategoryDto: UpdateSubSubCategoryDto,
  ) {
    try {
      const subSubCategoryToUpdate = { ...updateSubSubCategoryDto };
      if (updateSubSubCategoryDto.name) {
        const slug = slugify(updateSubSubCategoryDto.name, { lower: true });
        subSubCategoryToUpdate.slug = slug;
      }
      const subSubCategory = await this.subSubCategoryCollection.updateOne({
        filter: { slug },
        fields: subSubCategoryToUpdate,
      });
      return subSubCategory;
    } catch (error) {
      throw new NotFoundException('Failed to update SubSub Category');
    }
  }

  async removeSubSubCategory(slug: string) {
    try {
      const subSubCategory = await this.subSubCategoryCollection.deleteOne({
        filter: { slug },
      });
      return subSubCategory;
    } catch (error) {
      throw new NotFoundException('Failed to delete SubSub Category');
    }
  }
}

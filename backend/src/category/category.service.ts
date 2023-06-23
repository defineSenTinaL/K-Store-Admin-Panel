import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DB, Collection } from '@tigrisdata/core';
import { TigrisDBService } from 'src/db/tigris';
import { LoggingService } from 'src/modules/logging/logging.service';
import { Category, SubCategory, SubSubCategory } from './category.model';
import slugify from 'slugify';

@Injectable()
export class CategoryService {
  private readonly tigrisDB: DB;
  private readonly categoryCollection: Collection<Category>;
  private readonly SubcategoryCollection: Collection<SubCategory>;
  private readonly SubSubcategoryCollection: Collection<SubSubCategory>;

  constructor(private readonly loggingService: LoggingService) {
    this.tigrisDB = TigrisDBService.getTigrisDB();
    this.categoryCollection = this.tigrisDB.getCollection<Category>(Category);
    this.SubcategoryCollection =
      this.tigrisDB.getCollection<SubCategory>(SubCategory);
    this.SubSubcategoryCollection =
      this.tigrisDB.getCollection<SubSubCategory>(SubSubCategory);
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

  //Sub Category

  //Sub Sub Category
}

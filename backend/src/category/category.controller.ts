import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  Req,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  CategoryService,
  SubCategoryService,
  SubSubCategoryService,
} from './category.service';
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
import { CategoryExceptionFilter } from 'src/filters/category-exception-filter';
//import { validate } from 'class-validator';

// Category

@Controller('category')
@UseFilters(CategoryExceptionFilter)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryService.createCategory(
      createCategoryDto,
    );
    return category;
  }

  @Get()
  async getAllCategory(@Res() res: any) {
    try {
      // Assuming you have the category service instance injected in your controller
      const category = await this.categoryService.getAllCategory();
      return res.json(category);
    } catch (error) {
      // Handle any errors that might occur during the process
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

// Sub Category

@Controller('subcategory')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Post()
  async createSubCategory(
    @Body() createSubCategoryDto: CreateSubCategoryDto, // Expect categoryId from the request body
  ) {
    console.log(createSubCategoryDto);
    return this.subCategoryService.createSubCategory(createSubCategoryDto);
  }

  @Get()
  async getAllSubCategory(@Res() res: any) {
    try {
      // Assuming you have the category service instance injected in your controller
      const category = await this.subCategoryService.getAllSubCategory();
      return res.json(category);
    } catch (error) {
      // Handle any errors that might occur during the process
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

// Sub Sub Category

@Controller('subsubcategory')
export class SubSubCategoryController {
  constructor(private readonly subSubCategoryService: SubSubCategoryService) {}

  @Post()
  async createSubCategory(
    @Body() createSubSubCategoryDto: CreateSubSubCategoryDto, // Expect categoryId from the request body
  ) {
    return this.subSubCategoryService.createSubSubCategory(
      createSubSubCategoryDto,
    );
  }

  @Get()
  async getAllSubSubCategory(@Res() res: any) {
    try {
      // Assuming you have the category service instance injected in your controller
      const category = await this.subSubCategoryService.getAllSubSubCategory();
      return res.json(category);
    } catch (error) {
      // Handle any errors that might occur during the process
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

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
  UsePipes,
  ValidationPipe,
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
import { LoggingService } from 'src/modules/logging/logging.service';
//import { validate } from 'class-validator';

@Controller('category')
@UseFilters(CategoryExceptionFilter)
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly loggingService: LoggingService,
  ) {}

  @Post()
  //@UsePipes(ValidationPipe)
  async createCategory(
    @Req() req: any,
    @Body()
    createCategoryDto: CreateCategoryDto,
    @Res() res: any,
  ) {
    try {
      // validate(createCategoryDto).then((errors) => {
      //   // errors is an array of validation errors
      //   if (errors.length > 0) {
      //     console.log('validation failed. errors: ', errors);
      //   } else {
      //     console.log('validation succeed');
      //   }
      // });
      const category = await this.categoryService.createCategory(
        createCategoryDto,
      );
      //const logMessage = `Category created in Database (controller): ${category}`;
      //this.loggingService.log('info', logMessage);
      return res.status(200).json(category);
      //return res.json('Category created in Database (controller)', category);
    } catch (error) {
      const errorMessage = `Wrong Category Crendentials (controller): ${
        (req.seller, CreateCategoryDto)
      }`;
      this.loggingService.log('error', errorMessage);
    }
  }

  @Get()
  async listCategory(@Res() res: any) {
    try {
      const categories = await this.categoryService.listCategory();
      //console.log(categories);
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(404).json({ error: 'Category not found' });
    }
  }

  @Get(':slug')
  async listOneCategory(@Param('slug') slug: string, @Res() res: any) {
    try {
      const category = await this.categoryService.listOneCategory(slug);
      return res.status(200).json(category);
    } catch (error) {
      // Handle the error and return an appropriate response
      return res.status(404).json({ error: 'Category not found' });
    }
  }

  @Patch(':slug')
  async updateCategory(
    @Param('slug') slug: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Res() res: any,
  ) {
    try {
      const category = await this.categoryService.updateCategory(
        slug,
        updateCategoryDto,
      );
      return res.status(200).json(category);
    } catch (error) {
      return res.status(404).json({ error: 'Cant update the Category' });
    }
  }

  @Delete(':slug')
  async removeCategory(@Param('slug') slug: string, @Res() res: any) {
    try {
      const category = await this.categoryService.removeCategory(slug);
      return res.status(200).json(category);
    } catch (error) {
      return res.status(404).json({ error: 'Cant delete the Category' });
    }
  }
}

// Sub Category

@Controller('subcategory')
@UseFilters(CategoryExceptionFilter)
export class SubCategoryController {
  constructor(
    private readonly subCategoryService: SubCategoryService,
    private readonly loggingService: LoggingService,
  ) {}

  @Post()
  //@UsePipes(ValidationPipe)
  async createSubCategory(
    @Req() req: any,
    @Body()
    createSubCategoryDto: CreateSubCategoryDto,
    @Res() res: any,
  ) {
    try {
      // validate(createCategoryDto).then((errors) => {
      //   // errors is an array of validation errors
      //   if (errors.length > 0) {
      //     console.log('validation failed. errors: ', errors);
      //   } else {
      //     console.log('validation succeed');
      //   }
      // });
      const subCategory = await this.subCategoryService.createSubCategory(
        createSubCategoryDto,
      );
      //const logMessage = `Sub Category created in Database (controller): ${subCategory}`;
      //this.loggingService.log('info', logMessage);
      return res.status(200).json(subCategory);
      //return res.json('Category created in Database (controller)', subCategory);
    } catch (error) {
      const errorMessage = `Wrong Category Crendentials (controller): ${
        (req.seller, createSubCategoryDto)
      }`;
      this.loggingService.log('error', errorMessage);
      throw new HttpException(
        'Failed to create subcategory',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async listSubCategory(@Res() res: any) {
    try {
      const subCategories = await this.subCategoryService.listSubCategory();
      //console.log(categories);
      return res.status(200).json(subCategories);
    } catch (error) {
      return res.status(404).json({ error: 'Sub Category not found' });
    }
  }

  @Get(':slug')
  async listOneSubCategory(@Param('slug') slug: string, @Res() res: any) {
    try {
      const subCategory = await this.subCategoryService.listOneSubCategory(
        slug,
      );
      return res.status(200).json(subCategory);
    } catch (error) {
      // Handle the error and return an appropriate response
      return res.status(404).json({ error: 'Sub Category not found' });
    }
  }

  @Patch(':slug')
  async updateSubCategory(
    @Param('slug') slug: string,
    @Body() updateSubCategoryDto: UpdateSubCategoryDto,
    @Res() res: any,
  ) {
    try {
      const subCategory = await this.subCategoryService.updateSubCategory(
        slug,
        updateSubCategoryDto,
      );
      return res.status(200).json(subCategory);
    } catch (error) {
      return res.status(404).json({ error: 'Cant update the Sub Category' });
    }
  }

  @Delete(':slug')
  async removeSubCategory(@Param('slug') slug: string, @Res() res: any) {
    try {
      const subCategory = await this.subCategoryService.removeSubCategory(slug);
      return res.status(200).json(subCategory);
    } catch (error) {
      return res.status(404).json({ error: 'Cant delete the Sub Category' });
    }
  }
}

// Sub Sub Category

@Controller('subsubcategory')
@UseFilters(CategoryExceptionFilter)
export class SubSubCategoryController {
  constructor(
    private readonly subSubCategoryService: SubSubCategoryService,
    private readonly loggingService: LoggingService,
  ) {}

  @Post()
  //@UsePipes(ValidationPipe)
  async createSubSubCategory(
    @Req() req: any,
    @Body()
    createSubSubCategoryDto: CreateSubSubCategoryDto,
    @Res() res: any,
  ) {
    try {
      // validate(createCategoryDto).then((errors) => {
      //   // errors is an array of validation errors
      //   if (errors.length > 0) {
      //     console.log('validation failed. errors: ', errors);
      //   } else {
      //     console.log('validation succeed');
      //   }
      // });
      console.log(createSubSubCategoryDto);
      const subSubCategory =
        await this.subSubCategoryService.createSubSubCategory(
          createSubSubCategoryDto,
        );
      //const logMessage = `Category created in Database (controller): ${category}`;
      //this.loggingService.log('info', logMessage);
      return res.status(200).json(subSubCategory);
      //return res.json('Category created in Database (controller)', category);
    } catch (error) {
      const errorMessage = `Wrong Category Crendentials (controller): ${
        (req.seller, createSubSubCategoryDto)
      }`;
      this.loggingService.log('error', errorMessage);
    }
  }

  @Get()
  async listSubSubCategory(@Res() res: any) {
    try {
      const subSubCategories =
        await this.subSubCategoryService.listSubSubCategory();
      //console.log(categories);
      return res.status(200).json(subSubCategories);
    } catch (error) {
      return res.status(404).json({ error: 'Sub Sub Category not found' });
    }
  }

  @Get(':slug')
  async listOneSubSubCategory(@Param('slug') slug: string, @Res() res: any) {
    try {
      const subSubCategory =
        await this.subSubCategoryService.listOneSubSubCategory(slug);
      return res.status(200).json(subSubCategory);
    } catch (error) {
      // Handle the error and return an appropriate response
      return res.status(404).json({ error: 'Sub Sub Category not found' });
    }
  }

  @Patch(':slug')
  async updateSubSubCCategory(
    @Param('slug') slug: string,
    @Body() updateSubSubCategoryDto: UpdateSubSubCategoryDto,
    @Res() res: any,
  ) {
    try {
      const subSubCategory =
        await this.subSubCategoryService.updateSubSubCategory(
          slug,
          updateSubSubCategoryDto,
        );
      return res.status(200).json(subSubCategory);
    } catch (error) {
      return res
        .status(404)
        .json({ error: 'Cant update the Sub Sub Category' });
    }
  }

  @Delete(':slug')
  async removeSubSubCCategory(@Param('slug') slug: string, @Res() res: any) {
    try {
      const subSubCategory =
        await this.subSubCategoryService.removeSubSubCategory(slug);
      return res.status(200).json(subSubCategory);
    } catch (error) {
      return res
        .status(404)
        .json({ error: 'Cant delete the Sub Sub Category' });
    }
  }
}

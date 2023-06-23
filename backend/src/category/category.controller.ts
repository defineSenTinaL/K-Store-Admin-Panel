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
} from '@nestjs/common';
import { CategoryService } from './category.service';
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

  // Category
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

  // Sub Category

  // Sub Sub Category
}

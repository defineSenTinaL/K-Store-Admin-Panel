import { ProductService } from './product.service';
import {
  Controller,
  Get,
  Post,
  Delete,
  Res,
  Body,
  UseFilters,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { ProductExceptionFilter } from 'src/filters/product-exception-filter';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDocument } from './product.schema';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('product')
@UseFilters(ProductExceptionFilter)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Res() res: any,
  ) {
    try {
      //console.log(createProductDto);
      const createdProduct = await this.productService.createProduct(
        createProductDto,
      );
      return res.json('Product created in Database (controller)');
    } catch (error) {
      const errorMessage = `Wrong Product Credentials (controller): ${createProductDto}`;
      //this.loggingService.log('error', errorMessage);
      throw new Error(error.message);
    }
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }

  // get product by category

  @Get('/category/:categoryId')
  async getProductsByCategory(
    @Param('category') category: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.productService.getProductsByCategoryAndPagination(
      category,
      paginationDto,
    );
  }

  @Get('/subcategory/:subcategoryId')
  async getProductsBySubcategory(
    @Param('subCategory') subCategory: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.productService.getProductsBySubCategoryAndPagination(
      subCategory,
      paginationDto,
    );
  }

  @Get('/subsubcategory/:subsubcategoryId')
  async getProductsBySubsubcategory(
    @Param('subSubCategory') subSubCategory: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.productService.getProductsBySubSubCategoryAndPagination(
      subSubCategory,
      paginationDto,
    );
  }

  @Get('/most-selling')
  async getMostSellingProducts(): Promise<ProductDocument[]> {
    return this.productService.getMostSellingProducts();
  }
}

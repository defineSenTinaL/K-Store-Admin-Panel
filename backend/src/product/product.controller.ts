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
  Patch,
  NotFoundException,
  ParseIntPipe,
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

  @Get('brand')
  async getAllBrands(
    @Query() paginationDto: PaginationDto,
  ): Promise<string[] | null> {
    return this.productService.getAllBrands(paginationDto);
  }

  @Get()
  async getAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productService.getAllProducts(paginationDto);
  }

  @Get(':id')
  async getProductById(@Param('id') _id: string) {
    return this.productService.getProductById(_id);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') _id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(_id, updateProductDto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') _id: string) {
    return this.productService.deleteProduct(_id);
  }

  @Patch(':id/update-price')
  async updateProductPrice(
    @Param('id') _id: string,
    @Body('price') newPrice: number,
  ) {
    const updatedProduct = await this.productService.updateProductPrice(
      _id,
      newPrice,
    );
    if (updatedProduct) {
      return { message: 'Successfully updated product price' };
    } else {
      throw new NotFoundException('Product not found');
    }
  }

  @Patch(':id/update-quantity')
  async updateProductQuantity(
    @Param('id') productId: string,
    @Body('quantity') newQuantity: number,
  ) {
    const updatedProduct = await this.productService.updateProductQuantity(
      productId,
      newQuantity,
    );
    if (updatedProduct) {
      return { message: 'Successfully updated product quantity' };
    } else {
      throw new NotFoundException('Product not found');
    }
  }

  // get product by category

  @Get('/category/:categoryId')
  async getProductsByCategory(
    @Param('categoryId') category: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.productService.getProductsByCategoryAndPagination(
      category,
      paginationDto,
    );
  }

  @Get('/sub-category/:subCategoryId')
  async getProductsBySubcategory(
    @Param('subCategoryId') subCategory: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.productService.getProductsBySubCategoryAndPagination(
      subCategory,
      paginationDto,
    );
  }

  @Get('/sub-sub-category/:subSubCategoryId')
  async getProductsBySubsubcategory(
    @Param('subSubCategoryId') subSubCategory: string,
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

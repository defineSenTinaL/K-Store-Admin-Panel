import { ProductService } from './product.service';
import { Controller, Get, Post, Res, Body, UseFilters } from '@nestjs/common';
import { ProductExceptionFilter } from 'src/filters/product-exception-filter';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
@UseFilters(ProductExceptionFilter)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //Get ---> allProducts
  // @Get()
  // async getAllProducts(@Res() res: any): Promise<Product[]> {
  //   try {
  //     const products = await this.productService.getAllProducts();
  //     const logMessage = `All product retrieved and sent to frontend (controller):`;
  //     this.loggingService.log('info', logMessage);
  //     return res.json(products);
  //   } catch (error) {
  //     const errorMessage = `Error in processing Product request (controller): ${error.message}`;
  //     this.loggingService.log('error', errorMessage);
  //     throw new Error(errorMessage);
  //   }
  // }

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Res() res: any,
  ): Promise<CreateProductDto> {
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
}

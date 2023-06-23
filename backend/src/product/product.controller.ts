import { ProductService } from './product.service';
import { Controller, Get, Post, Res, Body, UseFilters } from '@nestjs/common';
import { LoggingService } from 'src/modules/logging/logging.service';
import { Product } from 'src/product/product.model';
import { ProductExceptionFilter } from 'src/filters/product-exception-filter';

@Controller('product')
@UseFilters(ProductExceptionFilter)
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly loggingService: LoggingService,
  ) {}

  //Get ---> allProducts
  @Get()
  async getAllProducts(@Res() res: any): Promise<Product[]> {
    try {
      const products = await this.productService.getAllProducts();
      const logMessage = `All product retrieved and sent to frontend (controller):`;
      this.loggingService.log('info', logMessage);
      return res.json(products);
    } catch (error) {
      const errorMessage = `Error in processing Product request (controller): ${error.message}`;
      this.loggingService.log('error', errorMessage);
      throw new Error(errorMessage);
    }
  }

  @Post()
  async createProduct(
    @Body() product: Product,
    @Res() res: any,
  ): Promise<Product> {
    try {
      const catalog = await this.productService.createProduct(product);
      const logMessage = `Product created in Database (controller): ${catalog}`;
      this.loggingService.log('info', logMessage);
      return res.json('Product created in Database (controller)');
    } catch (error) {
      const errorMessage = `Wrong Product Crendentials (controller): ${product}`;
      this.loggingService.log('error', errorMessage);
      throw new Error(error.message);
    }
  }
}

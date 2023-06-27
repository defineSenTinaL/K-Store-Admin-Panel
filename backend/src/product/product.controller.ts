import { ProductService } from './product.service';
import {
  Controller,
  Get,
  Post,
  Res,
  Body,
  UseFilters,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { LoggingService } from 'src/modules/logging/logging.service';
import { Product } from 'src/product/product.model';
import { ProductExceptionFilter } from 'src/filters/product-exception-filter';
import { CreateProductDto } from './dto/create-product.dto';
import { ImageKitService } from 'src/image/imagekit.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('product')
@UseFilters(ProductExceptionFilter)
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly loggingService: LoggingService,
    private readonly imageKitService: ImageKitService,
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
  @UseInterceptors(FilesInterceptor('files'))
  async createProduct(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createProductDto: CreateProductDto,
    @Res() res: any,
  ): Promise<Product> {
    try {
      console.log(files);
      console.log(createProductDto);
      const catalog = await this.productService.createProduct(
        createProductDto,
        files,
      );
      return res.json('Product created in Database (controller)');
    } catch (error) {
      const errorMessage = `Wrong Product Credentials (controller): ${createProductDto}`;
      this.loggingService.log('error', errorMessage);
      throw new Error(error.message);
    }
  }
}

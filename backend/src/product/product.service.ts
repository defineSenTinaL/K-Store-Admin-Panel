import { Injectable } from '@nestjs/common';
import { ProductDocument } from './product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import slugify from 'slugify';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}

  // constructor(private readonly loggingService: LoggingService) {}

  // async getAllProducts(): Promise<Product[]> {
  //   try {
  //     const products = await this.productCollection.findMany();
  //     const logMessage = `All Products Retrieved from database (Service): ${products}`;
  //     this.loggingService.log('info', logMessage);
  //     return products.toArray();
  //   } catch (error) {
  //     const errorMessage = `Error getting all products from database (Service): ${error.message}`;
  //     this.loggingService.log('error', errorMessage);
  //     throw new Error(errorMessage);
  //   }
  // }

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<ProductDocument> {
    // Use ProductDocument as the return type
    try {
      const title = createProductDto.title;
      const slug = slugify(title);
      createProductDto.slug = slug;
      //console.log(createProductDto);
      const createdProduct = new this.productModel(createProductDto);
      return createdProduct.save();
    } catch (error) {
      const errorMessage = `Error adding product to database (Service): ${error.message}`;
      console.log(errorMessage);
      //this.loggingService.log('error', errorMessage);
      throw new Error(error.message);
    }
  }
}

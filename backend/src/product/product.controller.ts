import { ProductService } from './product.service';
import { Controller, Get, Post, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { Product } from 'src/product/product.model';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //Get ---> allProducts
  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Post()
  async createProduct(@Body() product: Product): Promise<Product> {
    return this.productService.createProduct(product);
  }
}

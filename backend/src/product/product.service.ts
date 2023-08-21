import { Injectable } from '@nestjs/common';
import { ProductDocument } from './product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import slugify from 'slugify';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}

  // Create Product

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<ProductDocument | null> {
    // Use ProductDocument as the return type
    try {
      const title = createProductDto.title;
      const slug = slugify(title, { lower: true, trim: true });
      createProductDto.slug = slug;
      //console.log(createProductDto);
      const createdProduct = new this.productModel(createProductDto);
      return createdProduct.save();
    } catch (error) {
      const errorMessage = `Error adding product to database (Service): ${error.message}`;
      console.log(errorMessage);
      //this.loggingService.log('error', errorMessage);
      throw new Error(errorMessage);
    }
  }

  async getAllProducts(
    paginationDto: PaginationDto,
  ): Promise<ProductDocument[] | null> {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;
    try {
      return await this.productModel
        .find()
        .sort({ quantity: 1 }) // Sort by low quantity
        .skip(skip)
        .limit(limit)
        .exec();
    } catch (error) {
      const errorMessage = `Error getting products by low quantity and pagination (Service): ${error.message}`;
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  }

  async getAllBrands(paginationDto: PaginationDto): Promise<string[] | null> {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      const distinctBrands = await this.productModel
        .aggregate([
          { $group: { _id: '$brand' } }, // Group by brand field
          { $skip: skip }, // Skip documents based on pagination
          { $limit: 10 }, // Limit documents per page
        ])
        .exec();

      const brandNames = distinctBrands.map((result) => result._id);
      return brandNames;
    } catch (error) {
      const errorMessage = `Error getting brands with pagination (Service): ${error.message}`;
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  }

  // Get Product By ID

  async getProductById(id: string): Promise<ProductDocument | null> {
    try {
      // Use populate to fetch the category, subcategory, and subsubcategory information along with the product
      return await this.productModel
        .findById(id)
        .select('-sold -kharidi')
        .populate('category')
        .populate('subCategory')
        .populate('subSubCategory')
        .exec();
    } catch (error) {
      const errorMessage = `Error getting product by ID (Service): ${error.message}`;
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  }

  // Update the Product

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductDocument | null> {
    try {
      const updatedProduct = await this.productModel.findByIdAndUpdate(
        id,
        updateProductDto,
        {
          new: true, // Return the modified document instead of the original one
        },
      );
      if (!updatedProduct) {
        throw new Error('Product not found');
      }
      return updatedProduct;
    } catch (error) {
      const errorMessage = `Error updating product (Service): ${error.message}`;
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  }

  //Delete the Product

  async deleteProduct(id: string): Promise<ProductDocument | null> {
    try {
      return await this.productModel.findByIdAndRemove(id).exec();
    } catch (error) {
      const errorMessage = `Error deleting product (Service): ${error.message}`;
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  }

  async updateProductPrice(
    productId: string,
    newPrice: number,
  ): Promise<ProductDocument | null> {
    try {
      const updatedProduct = await this.productModel.findByIdAndUpdate(
        productId,
        { price: newPrice },
        { new: true },
      );
      return updatedProduct;
    } catch (error) {
      // Handle error
      throw new Error('Error updating product price');
    }
  }

  async updateProductQuantity(
    productId: string,
    newQuantity: number,
  ): Promise<ProductDocument | null> {
    try {
      const updatedProduct = await this.productModel.findByIdAndUpdate(
        productId,
        { quantity: newQuantity },
        { new: true },
      );
      return updatedProduct;
    } catch (error) {
      // Handle error
      throw new Error('Error updating product quantity');
    }
  }

  // Get Product by Category

  async getProductsByCategoryAndPagination(
    category: string,
    paginationDto: PaginationDto,
  ): Promise<ProductDocument[] | null> {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      return await this.productModel
        .find({ category })
        .select('-sold -kharidi')
        .skip(skip)
        .limit(limit)
        .exec();
    } catch (error) {
      const errorMessage = `Error getting products by category and pagination (Service): ${error.message}`;
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  }

  async getProductsBySubCategoryAndPagination(
    subCategory: string,
    paginationDto: PaginationDto,
  ): Promise<ProductDocument[] | null> {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      return await this.productModel
        .find({ subCategory })
        .select('-sold -kharidi')
        .skip(skip)
        .limit(limit)
        .exec();
    } catch (error) {
      const errorMessage = `Error getting products by subcategory and pagination (Service): ${error.message}`;
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  }

  async getProductsBySubSubCategoryAndPagination(
    subSubCategory: string,
    paginationDto: PaginationDto,
  ): Promise<ProductDocument[] | null> {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      return await this.productModel
        .find({ subSubCategory })
        .select('-sold -kharidi')
        .skip(skip)
        .limit(limit)
        .exec();
    } catch (error) {
      const errorMessage = `Error getting products by subsubcategory and pagination (Service): ${error.message}`;
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  }

  async getMostSellingProducts(): Promise<ProductDocument[]> {
    try {
      return await this.productModel
        .find()
        .sort({ totalSales: -1 }) // Sort by totalSales in descending order
        .limit(10)
        .exec();
    } catch (error) {
      const errorMessage = `Error getting most selling products (Service): ${error.message}`;
      console.log(errorMessage);
      throw new Error(error.message);
    }
  }
}

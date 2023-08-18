import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  image: string;
}

export class CreateSubCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsMongoId() // Validate that the category is a valid MongoDB ObjectId
  parentId: string; // This should be a string since the ObjectId is a string
}

export class CreateSubSubCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsMongoId() // Validate that the subcategory is a valid MongoDB ObjectId
  parentId: string; // This should be a string since the ObjectId is a string
}

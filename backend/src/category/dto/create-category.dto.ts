import { IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @Length(3, 20)
  name: string;

  @IsString()
  slug: string;

  entryDate: Date;
}

export class CreateSubCategoryDto {
  @Length(3, 20)
  name: string;

  @IsString()
  slug: string;

  entryDate: Date;
}

export class CreateSubSubCategoryDto {
  @Length(3, 20)
  name: string;

  @IsString()
  slug: string;

  entryDate: Date;
}

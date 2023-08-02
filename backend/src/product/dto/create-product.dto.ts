export interface ProductDimension {
  length: number;
  breadth: number;
  height: number;
}

export interface PackageDimension {
  length: number;
  breadth: number;
  height: number;
}

export interface Variance {
  color: string;

  quantity: number;

  size: string;

  style: string;

  material: string;
}

export interface ImageData {
  url: string;
  fileId: string;
}

export class CreateProductDto {
  title: string;
  slug: string;
  brand: string;
  manufacturer: string;
  manufacturerDetail: string;
  manufacturerPartNumber: string;
  warranty: string;
  mrp: number;
  price: number;
  description: string;
  bullet: string[];
  color: string;
  material: string;
  quantity: number;
  kharidi: number;
  category: string;
  subCategory: string;
  subSubCategory: string;
  size: string;
  image: ImageData[];
  asin: string;
  sku: string;
  gst: number;
  state: string;
  gift: string;
  origin: string;
  hsn: number;
  keyword: string[];
  weight: number;
  productDimension: ProductDimension;
  count: number;
  component: string;
  fragile: string;
  packageDimension: PackageDimension;
  packageWeight: number;
  shape: string;
  model: string;
  style: string;
  delivery: string;
  return: string;
  sold: number;
  productData: string;
  variants?: Variance[];
}

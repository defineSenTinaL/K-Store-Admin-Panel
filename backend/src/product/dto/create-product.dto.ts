// export class ProductDimension {
//   length: number;
//   breadth: number;
//   height: number;
// }

// export class PackageDimension {
//   length: number;
//   breadth: number;
//   height: number;
// }
export class CreateProductDto {
  title: string;
  brand: string;
  manufacturer: string;
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
  image: string[];
  asin: string;
  sku: string;
  gst: number;
  conditon: string;
  gift: string;
  origin: string;
  hsn: number;
  keyword: string[];
  weight: number;
  productDimension: [];
  count: number;
  component: string[];
  fragile: string;
  packageDimension: [];
  packageWeight: number;
  shape: string;
  model: string;
  style: string;
  delivery: string;
  return: string[];
  sold: number;
}

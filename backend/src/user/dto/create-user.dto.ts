import {
  IsEmail,
  IsArray,
  ArrayMinSize,
  IsString,
  IsMongoId,
} from 'class-validator';

class AddressDTO {
  name: string;

  mobile: string;

  addressLine: string;

  street: string;

  city: string;

  state: string;

  pincode: string;

  addressType: string;
}

class CartProductDTO {
  @IsMongoId()
  productId: string; // Replace with the appropriate type (Types.ObjectId) if needed

  quantity: number;
}

class WishlistProductDTO {
  @IsMongoId()
  productId: string; // Replace with the appropriate type (Types.ObjectId) if needed
}

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  mobileNumber: string;

  @IsArray()
  @ArrayMinSize(1)
  addresses: AddressDTO[];

  @IsArray()
  cart: CartProductDTO[];

  @IsArray()
  wishlist: WishlistProductDTO[];
}

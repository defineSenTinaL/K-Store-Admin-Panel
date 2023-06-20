import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { SellerService } from './seller.service';
import { CreateSellerDto } from './dto/create-seller.dto';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post('/create-seller')
  async createUpdate(
    @Req() req: any,
    @Body() CreateSellerDto: CreateSellerDto,
    @Res() res: any,
  ) {
    const { email } = req.seller;
    console.log(email);
    const newSeller = await this.sellerService.createUpdate(
      email,
      CreateSellerDto,
    );
    return res.json('Seller created in Database');
  }

  @Get('/current-seller')
  async getCurrentUser(@Req() req: any, @Res() res: any) {
    const { email } = req.seller;
    //console.log(email);
    const seller = await this.sellerService.getCurrentSeller(email);
    //console.log(seller);
    return res.json(seller);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Res,
  UseFilters,
} from '@nestjs/common';
import { SellerService } from './seller.service';
import { CreateSellerDto } from './dto/create-seller.dto';

import { SellerExceptionFilter } from 'src/filters/seller-exception-filter';
import { SellerDocument } from './seller.schema';

@Controller('seller')
@UseFilters(SellerExceptionFilter)
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post('/create-seller')
  async create(
    @Req() req: any,
    @Body() sellerData: Partial<SellerDocument>,
    @Res() res: any,
  ) {
    try {
      //const { email } = req.seller;
      //const newSellerDto = { ...createSellerDto, email };
      //console.log(newSellerDto);
      const newSeller = await this.sellerService.createSeller(sellerData);
      //console.log(newSeller);
      return res.json('Seller created in Database');
    } catch (error) {
      const errorMessage = `Wrong Seller Crendentials (controller): ${
        (req.seller, CreateSellerDto)
      }`;
    }
  }

  @Get('/current-seller')
  async getCurrentUser(@Req() req: any, @Res() res: any) {
    try {
      //const { email } = data;
      const { email } = req.seller;
      const seller = await this.sellerService.getCurrentSeller(email);
      // const logMessage = `Current Seller Logged in (controller): ${seller}`;
      // this.loggingService.log('info', logMessage);
      return res.json(seller);
    } catch (error) {
      const errorMessage = `Wrong Seller Crendentials (controller): ${req.seller}`;
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

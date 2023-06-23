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

import { LoggingService } from 'src/modules/logging/logging.service';

import { SellerExceptionFilter } from 'src/filters/seller-exception-filter';

@Controller('seller')
@UseFilters(SellerExceptionFilter)
export class SellerController {
  constructor(
    private readonly sellerService: SellerService,
    private readonly loggingService: LoggingService,
  ) {}

  @Post('/create-seller')
  async create(
    @Req() req: any,
    @Body() CreateSellerDto: CreateSellerDto,
    @Res() res: any,
  ) {
    try {
      const { email } = req.seller;
      console.log(email);
      const newSeller = await this.sellerService.create(email, CreateSellerDto);
      const logMessage = `Seller created in Database (controller): ${newSeller}`;
      this.loggingService.log('info', logMessage);
      //console.log(newSeller);
      return res.json('Seller created in Database');
    } catch (error) {
      const errorMessage = `Wrong Seller Crendentials (controller): ${
        (req.seller, CreateSellerDto)
      }`;
      this.loggingService.log('error', errorMessage);
    }
  }

  @Get('/current-seller')
  async getCurrentUser(@Req() req: any, @Res() res: any) {
    try {
      const { email } = req.seller;
      //console.log(req.seller);
      const seller = await this.sellerService.getCurrentSeller(email);
      //console.log(seller);
      // const logMessage = `Current Seller Logged in (controller): ${seller}`;
      // this.loggingService.log('info', logMessage);
      return res.json(seller);
    } catch (error) {
      const errorMessage = `Wrong Seller Crendentials (controller): ${req.seller}`;
      this.loggingService.log('error', errorMessage);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

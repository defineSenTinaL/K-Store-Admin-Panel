import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { LoggingModule } from 'src/modules/logging/logging.module';

@Module({
  imports: [LoggingModule],
  controllers: [SellerController],
  providers: [SellerService, LoggingModule],
})
export class SellerModule {}

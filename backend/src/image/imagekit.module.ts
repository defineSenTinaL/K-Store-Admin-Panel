import { Module } from '@nestjs/common';
import { ImageKitService } from './imagekit.service';
import { ImageController } from './imagekit.controller';

@Module({
  providers: [ImageKitService],
  controllers: [ImageController],
  exports: [ImageKitService],
})
export class ImageKitModule {}

import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageKitService } from './imagekit.service';

@Controller('images')
export class ImageController {
  constructor(private readonly imageKitService: ImageKitService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    try {
      console.log(files);
      //const uploadResults = await this.imageKitService.uploadFiles(files);
      //return { success: true, uploadResults };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

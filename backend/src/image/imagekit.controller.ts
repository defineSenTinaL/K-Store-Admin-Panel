import { Controller, Delete, Get, Param, Res } from '@nestjs/common';
import { ImageKitService } from './imagekit.service';

@Controller('images')
export class ImageController {
  constructor(private readonly imageKitService: ImageKitService) {}

  @Get('auth')
  async getAuthenticationParameters(@Res() res: any) {
    try {
      const auth = this.imageKitService.getAuthenticationParameters();
      return res.json(auth);
    } catch (error) {
      const errorMessage = `Error in processing Product request (controller): ${error.message}`;
      // this.loggingService.log('error', errorMessage);
      throw new Error(errorMessage);
    }
  }

  @Delete(':fileId')
  async deleteImage(@Param('fileId') fileId: string, @Res() res: any) {
    console.log(fileId);
    try {
      const result = await this.imageKitService.deleteImage(fileId);
      console.log(result);
      return res.json(result);
    } catch (error) {
      const errorMessage = `Error in processing Product request (controller): ${error.message}`;
      // this.loggingService.log('error', errorMessage);
      throw new Error(errorMessage);
    }
  }
}

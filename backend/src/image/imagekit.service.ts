import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ImageKit from 'imagekit';

@Injectable()
export class ImageKitService {
  private readonly imageKit: ImageKit;

  constructor(private readonly configService: ConfigService) {
    this.imageKit = new ImageKit({
      publicKey: this.configService.get<string>('IMAGEKIT_PUBLIC_KEY', ''),
      privateKey: this.configService.get<string>('IMAGEKIT_PRIVATE_KEY', ''),
      urlEndpoint: this.configService.get<string>('IMAGEKIT_URL_ENDPOINT', ''),
    });
  }
  getAuthenticationParameters() {
    try {
      return this.imageKit.getAuthenticationParameters();
    } catch (error) {
      const errorMessage = `Error in processing Product request (Service): ${error.message}`;
      // this.loggingService.log('error', errorMessage);
      throw new Error(errorMessage);
    }
  }

  async deleteImage(fileId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.imageKit.deleteFile(fileId, (error, result) => {
        if (error) {
          reject(error);
        } else {
          console.log(result);
          resolve(result);
        }
      });
    });
  }
}

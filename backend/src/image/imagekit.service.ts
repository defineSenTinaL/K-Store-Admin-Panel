import { Injectable } from '@nestjs/common';
import ImageKit from 'imagekit';

@Injectable()
export class ImageKitService {
  private readonly imageKit: ImageKit;

  constructor() {
    this.imageKit = new ImageKit({
      publicKey: 'public_xL5mD9kBclemQcQwc/RQV5R04qY=',
      privateKey: 'private_aGkkizwRSKElqa2QJ+alFv2nRlE=',
      urlEndpoint: 'https://ik.imagekit.io/dintly',
    });
  }

  async uploadFiles(files: Express.Multer.File[]): Promise<string[]> {
    const uploadPromises = files.map((file) => {
      return new Promise<string>((resolve, reject) => {
        this.imageKit
          .upload({
            file: file.buffer,
            fileName: file.originalname,
          })
          .then((response) => {
            resolve(response.url);
          })
          .catch((error) => {
            reject(error);
          });
      });
    });

    try {
      const uploadResults = await Promise.all(uploadPromises);
      return uploadResults;
    } catch (error) {
      throw error;
    }
  }
}

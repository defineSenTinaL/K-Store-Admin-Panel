import ImageKit from 'imagekit';

export const ImagekitProvider = {
  provide: ImageKit,
  useFactory: (): ImageKit => {
    return new ImageKit({
      publicKey: 'public_xL5mD9kBclemQcQwc/RQV5R04qY=',
      privateKey: 'private_aGkkizwRSKElqa2QJ+alFv2nRlE=',
      urlEndpoint: 'https://ik.imagekit.io/dintly',
    });
  },
};

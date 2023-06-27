import * as dotenv from 'dotenv';

dotenv.config();

// const { IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT } =
//   process.env;

const imagekitConfig = {
  publicKey: 'public_xL5mD9kBclemQcQwc/RQV5R04qY=',
  privateKey: 'private_aGkkizwRSKElqa2QJ+alFv2nRlE=',
  urlEndpoint: 'https://ik.imagekit.io/dintly',
};

export default imagekitConfig;

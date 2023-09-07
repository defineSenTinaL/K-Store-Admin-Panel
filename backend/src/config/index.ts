const dotenv = require('dotenv');
dotenv.config();

const config = {
  GOOGLE_APPLICATION_CREDENTIALS:
    process.env.GOOGLE_APPLICATION_CREDENTIALS || '',
  IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY || '',
  IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY || '',
  IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT || '',
  MONGODB_CONNECTION_URL: process.env.MONGODB_CONNECTION_URL || '',
};

export default config;

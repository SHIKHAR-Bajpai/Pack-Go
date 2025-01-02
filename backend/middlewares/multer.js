import pkg from 'cloudinary';
const { v2: cloudinary } = pkg;
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

import { config } from 'dotenv'; 
config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'images', 
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

export const upload = multer({ storage: storage });

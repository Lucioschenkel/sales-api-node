import path from 'path';
import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';
import auth from './auth';

const uploadFolder = path.resolve(__dirname, '../../', 'uploads');
const tmpFolder = path.resolve(__dirname, '..', '..', 'temp');

interface IUploadConfig {
  driver: 's3' | 'disk';
  tmpFolder: string;
  directory: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    aws: {
      bucket: string;
    };
  };
}

export default {
  directory: uploadFolder,
  tmpFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const seed = crypto.randomBytes(10).toString('hex');

        const nameHash = crypto
          .createHmac('sha256', auth.jwt.secret || '')
          .update(seed)
          .digest('hex');

        const filename = `${nameHash}-${file.originalname}`;

        callback(null, filename);
      },
    }),
  },
  config: {
    aws: {
      bucket: process.env.AWS_BUCKET,
    },
  },
} as IUploadConfig;

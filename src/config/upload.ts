import path from 'path';
import multer from 'multer';
import crypto from 'crypto';
import auth from './auth';

const uploadFolder = path.resolve(__dirname, '../../', 'uploads');

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(request, file, callback) {
      const seed = crypto.randomBytes(10).toString('hex');

      const nameHash = crypto
        .createHmac('sha256', auth.jwt.secret)
        .update(seed)
        .digest('hex');

      const filename = `${nameHash}-${file.originalname}`;

      callback(null, filename);
    },
  }),
};

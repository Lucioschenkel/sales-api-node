import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import DiskStorageProvider from '@shared/providers/storage/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/storage/S3StorageProvider';
import upload from '@config/upload';

interface IRequest {
  userId: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarFileName }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.');
    }

    let filename = '';

    if (upload.driver === 's3') {
      const storageProvider = new S3StorageProvider();

      if (user.avatar) {
        await storageProvider.deleteFile(user.avatar);
      }

      filename = await storageProvider.saveFile(avatarFileName);
    } else {
      const storageProvider = new DiskStorageProvider();

      if (user.avatar) {
        await storageProvider.deleteFile(user.avatar);
      }

      filename = await storageProvider.saveFile(avatarFileName);
    }

    user.avatar = filename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;

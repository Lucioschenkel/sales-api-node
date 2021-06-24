import path from 'path';
import { promises as fs } from 'fs';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import uploadConfig from '@config/upload';

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

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;

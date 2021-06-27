import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import DiskStorageProvider from '@shared/providers/storage/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/storage/S3StorageProvider';
import upload from '@config/upload';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

interface IRequest {
  userId: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

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

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;

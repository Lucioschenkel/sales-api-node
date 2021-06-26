import { promises as fs } from 'fs';
import path from 'path';
import upload from '@config/upload';

export default class DiskStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.rename(
      path.resolve(upload.tmpFolder, file),
      path.resolve(upload.directory, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(upload.directory, file);

    try {
      await fs.stat(filePath);
    } catch {
      return;
    }

    await fs.unlink(filePath);
  }
}

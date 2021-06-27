import { IHashProvider } from '../models/IHashProvider';

class FakeHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }

  public async compareHash(raw: string, hash: string): Promise<boolean> {
    return raw === hash;
  }
}

export default FakeHashProvider;

import { compare, hash } from 'bcryptjs';
import { IHashProvider } from '../models/IHashProvider';

class BcrtyptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(raw: string, hash: string): Promise<boolean> {
    return compare(raw, hash);
  }
}

export default BcrtyptHashProvider;

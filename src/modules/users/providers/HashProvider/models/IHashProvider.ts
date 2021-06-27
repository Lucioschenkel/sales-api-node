export interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  compareHash(raw: string, hash: string): Promise<boolean>;
}

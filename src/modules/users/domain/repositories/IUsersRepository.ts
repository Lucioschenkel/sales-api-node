import { ICreateUser } from '../models/ICreateUser';
import { IUser } from '../models/IUser';

export interface IUsersRepository {
  findByName(name: string): Promise<IUser | undefined>;
  findById(id: string): Promise<IUser | undefined>;
  findByEmail(email: string): Promise<IUser | undefined>;
  find(): Promise<IUser[]>;
  create(user: ICreateUser): Promise<IUser>;
  save(user: IUser): Promise<IUser>;
}

import { v4 as uuidv4 } from 'uuid';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { IUser } from '@modules/users/domain/models/IUser';

export class FakeUsersRepository implements IUsersRepository {
  private users: IUser[] = [];

  public async create(user: IUser): Promise<IUser> {
    const promise = new Promise<IUser>(resolve => {
      user.id = uuidv4();

      this.users.push(user);

      resolve(user);
    });

    return promise;
  }

  public async find(): Promise<IUser[]> {
    const promise = new Promise<IUser[]>(resolve => {
      resolve(this.users);
    });

    return promise;
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    const promise = new Promise<IUser | undefined>(resolve => {
      resolve(this.users.find(u => u.email === email));
    });

    return promise;
  }

  public async findById(id: string): Promise<IUser | undefined> {
    const promise = new Promise<IUser | undefined>(resolve => {
      resolve(this.users.find(u => u.id === id));
    });

    return promise;
  }

  public async findByName(name: string): Promise<IUser | undefined> {
    const promise = new Promise<IUser | undefined>(resolve => {
      resolve(this.users.find(u => u.name === name));
    });

    return promise;
  }

  public async save(user: IUser): Promise<IUser> {
    const promise = new Promise<IUser>(resolve => {
      const userIndex = this.users.findIndex(u => u.id === user.id);
      this.users[userIndex] = user;

      resolve(user);
    });

    return promise;
  }
}

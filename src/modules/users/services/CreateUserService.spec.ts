import 'reflect-metadata';
import CreateUserService from './CreateUserService';
import { FakeUsersRepository } from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let createUser: CreateUserService;
  let hashProvider: FakeHashProvider;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    createUser = new CreateUserService(hashProvider, fakeUsersRepository);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      email: 'teste@example.com',
      name: 'John Doe',
      password: '1234',
    });

    expect(user).toHaveProperty('id');
  });
});

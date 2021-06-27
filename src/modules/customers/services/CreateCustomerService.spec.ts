import 'reflect-metadata';
import CreateCustomerService from './CreateCustomerService';
import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/FakeCustomersRepository';
import AppError from '@shared/errors/AppError';

describe('CreateCustomer', () => {
  let fakeCustomersRepository: FakeCustomersRepository;
  let createCustomer: CreateCustomerService;

  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomer = new CreateCustomerService(fakeCustomersRepository);
  });

  it('should be able to create a new customer', async () => {
    const customer = await createCustomer.execute({
      name: 'Lucio Schenkel',
      email: 'teste@example.com',
    });

    expect(customer).toHaveProperty('id');
  });

  it('should not be able to create two customers with the same email', async () => {
    await createCustomer.execute({
      name: 'Lucio Schenkel',
      email: 'teste@example.com',
    });

    expect(
      createCustomer.execute({
        name: 'John Doe',
        email: 'teste@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

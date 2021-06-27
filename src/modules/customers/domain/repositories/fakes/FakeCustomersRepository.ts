import { v4 as uuidv4 } from 'uuid';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';

class FakeCustomersRepository implements ICustomersRepository {
  private customers: Customer[] = [];

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const promise = new Promise<Customer>((resolve, reject) => {
      const customer = new Customer();

      customer.id = uuidv4();
      customer.name = name;
      customer.email = email;

      this.customers.push(customer);

      resolve(customer);
    });

    return promise;
  }

  public async remove(customer: Customer): Promise<void> {
    this.customers = this.customers.filter(c => c.id !== customer.id);
    return;
  }

  createQueryBuilder(): void {
    return;
  }

  public async save(customer: Customer): Promise<Customer> {
    const findIndex = this.customers.findIndex(
      findCustomer => findCustomer.id === customer.id,
    );

    this.customers[findIndex] = customer;

    return customer;
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.name === name);
    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.id === id);
    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const promise = new Promise<Customer | undefined>(resolve => {
      const customer = this.customers.find(
        customer => customer.email === email,
      );
      resolve(customer);
    });

    return promise;
  }
}

export default FakeCustomersRepository;

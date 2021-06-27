import { injectable, inject } from 'tsyringe';
import Customer from '../infra/typeorm/entities/Customer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

interface IPaginatedCustomers {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Customer[];
}

@injectable()
class ListCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}
  public async execute(): Promise<IPaginatedCustomers> {
    const customers = await this.customersRepository
      .createQueryBuilder()
      .paginate();

    return customers as IPaginatedCustomers;
  }
}

export default ListCustomerService;

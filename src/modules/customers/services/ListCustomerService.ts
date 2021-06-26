import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

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

class ListCustomerService {
  public async execute(): Promise<IPaginatedCustomers> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customers = await customersRepository.createQueryBuilder().paginate();

    return customers as IPaginatedCustomers;
  }
}

export default ListCustomerService;

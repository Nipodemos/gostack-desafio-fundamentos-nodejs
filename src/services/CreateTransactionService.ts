import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: RequestDTO): Transaction {
    const balance = this.transactionsRepository.getBalance();
    if (type !== 'income' && type !== 'outcome') {
      throw new Error(
        'Invalid request, type of transaction can only be income or outcome',
      );
    } else if (Number.isNaN(value)) {
      throw new Error('Invalid request, value is not a number');
    } else if (type === 'outcome' && balance.total - value < 0) {
      throw new Error(
        "You don't have enough money in your account to make this",
      );
    }

    const newTransaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });
    return newTransaction;
  }
}

export default CreateTransactionService;

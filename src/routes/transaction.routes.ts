import { Router, Request, Response } from 'express';
import Transaction from '../models/Transaction';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request: Request, response: Response) => {
  const transactions = transactionsRepository.all();
  const balance = transactionsRepository.getBalance();
  return response.json({ transactions, balance });
});

transactionRouter.post('/', (request: Request, response: Response) => {
  try {
    const { title, value, type } = request.body;
    const createTransactionService = new CreateTransactionService(
      transactionsRepository,
    );
    const createdTransaction = createTransactionService.execute({
      title,
      value,
      type,
    });
    return response.json(createdTransaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;

import isLikelyMatch from './isLikelyMatch';
import { Order, Transaction, Thresholds } from 'src/types';

describe('isLikelyMatch', () => {
  it('should return true if the order and transaction are a likely match', () => {
    const order: Order = {
      id: '123a7',
      type: 'order',
      customerName: 'John Doe',
      date: '2021-01-01',
      product: 'Product A',
      price: 100,
    };

    const transaction: Transaction = {
      id: '1',
      type: 'transaction',
      customerName: 'Jon Doe',
      orderId: '123A8',
      date: '2021-01-01',
      product: 'Produt A',
      price: 100,
      transactionType: 'purchase',
      transactionDate: '2021-01-01',
      transactionAmount: 100,
    };

    const thresholds: Thresholds = {
      customerNameSimilarity: 80,
      orderIdSimilarity: 80,
      productSimilarity: 80,
    };

    const result = isLikelyMatch(order, transaction, thresholds);
    expect(result).toBe(true);
  });

  it('should return false if the order and transaction are not a likely match', () => {
    const order: Order = {
      id: '1',
      type: 'order',
      customerName: 'John Doe',
      date: '2021-01-01',
      product: 'Product A',
      price: 100,
    };

    const transaction: Transaction = {
      id: '2',
      type: 'transaction',
      customerName: 'Jane Doe',
      orderId: '2',
      date: '2021-01-02',
      product: 'Product B',
      price: 200,
      transactionType: 'purchase',
      transactionDate: '2021-01-02',
      transactionAmount: 200,
    };

    const thresholds: Thresholds = {
      customerNameSimilarity: 80,
      orderIdSimilarity: 80,
      productSimilarity: 80,
    };

    const result = isLikelyMatch(order, transaction, thresholds);
    expect(result).toBe(false);
  });
});

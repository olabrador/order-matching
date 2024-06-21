import { MatchedRecord, Order, Thresholds, Transaction } from '../types';
import matchRecords from "./matchRecords";

describe('matchRecords', () => {
  const thresholds: Thresholds = {
    customerNameSimilarity: 80,
    orderIdSimilarity: 80,
    productSimilarity: 80,
  };
  it('should match orders and transactions with small typing errors', () => {
    const orders: Order[] = [
      {
        id: 1,
        orderId: 'abcde1',
        type: 'order',
        customerName: 'John Doe',
        date: '2021-01-01',
        product: 'Product A',
        price: 100,
      },
      {
        id: 2,
        orderId: 'fghij2',
        type: 'order',
        customerName: 'Jane Doe',
        date: '2021-01-02',
        product: 'Product B',
        price: 200,
      },
    ];

    const transactions: Transaction[] = [
      {
        id: 1,
        type: 'transaction',
        customerName: 'Jhon Do', // small typing error
        orderId: 'abcde2', // small typing error
        date: '2021-01-01',
        product: 'Product B', // small typing error
        price: 100,
        transactionType: 'purchase',
        transactionDate: '2021-01-01',
        transactionAmount: 100,
      },
      {
        id: 2,
        type: 'transaction',
        customerName: 'Jane Do', // small typing error
        orderId: 'fghij3', // small typing error
        date: '2021-01-02',
        product: 'Product C', // small typing error
        price: 200,
        transactionType: 'purchase',
        transactionDate: '2021-01-02',
        transactionAmount: 200,
      },
    ];

    const expected: MatchedRecord[] = [
      {
        ...orders[0],
        transactions: [transactions[0]],
      },
      {
        ...orders[1],
        transactions: [transactions[1]],
      },
    ];

    const result = matchRecords(orders, transactions, thresholds);
    expect(result).toEqual(expected);
  });
});

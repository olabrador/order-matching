import matchExactRecords from './matchExactRecords';
import { Order, Transaction, MatchedRecord } from 'types/index';

describe('matchExactRecords', () => {
  it('should match multiple orders and transactions based on orderId, customerName, and product', () => {
    const orders: Order[] = [
      {
        id: 1,
        orderId: '123',
        type: 'order',
        customerName: 'John Doe',
        date: '2021-01-01',
        product: 'Product A',
        price: 100,
      },
      {
        id: 2,
        orderId: '456',
        type: 'order',
        customerName: 'Jane Smith',
        date: '2021-01-02',
        product: 'Product B',
        price: 200,
      },
    ];
    const transactions: Transaction[] = [
      {
        id: 1538,
        type: 'transaction',
        customerName: 'John Doe',
        orderId: '123',
        date: '2021-01-01',
        product: 'Product A',
        price: 100,
        transactionType: 'purchase',
        transactionDate: '2021-01-01',
        transactionAmount: 100,
      },
      {
        id: 6572,
        type: 'transaction',
        customerName: 'Jane Smith',
        orderId: '456',
        date: '2021-01-02',
        product: 'Product B',
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
    const result = matchExactRecords(orders, transactions);
    expect(result).toEqual(expected);
  });

  it('should not match orders and transactions with different orderId', () => {
    const orders: Order[] = [
      {
        id: 123,
        orderId: '123',
        type: 'order',
        customerName: 'John Doe',
        date: '2021-01-01',
        product: 'Product A',
        price: 100,
      },
    ];
    const transactions: Transaction[] = [
      {
        id: 4537,
        type: 'transaction',
        customerName: 'John Doe',
        orderId: '456',
        date: '2021-01-01',
        product: 'Product A',
        price: 100,
        transactionType: 'purchase',
        transactionDate: '2021-01-01',
        transactionAmount: 100,
      },
    ];
    const expected: MatchedRecord[] = [];
    const result = matchExactRecords(orders, transactions);
    expect(result).toEqual(expected);
  });
});

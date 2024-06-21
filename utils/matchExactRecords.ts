import { MatchedRecord, Order, Transaction } from '../types';

export default function matchExactRecords(orders: Order[], transactions: Transaction[]): MatchedRecord[] {
  const matchedRecords: MatchedRecord[] = orders.map((order) => {
    const matchedTransactions = transactions.filter((transaction) => {
      return transaction.orderId === order.orderId
        && transaction.customerName === order.customerName
        && transaction.product === order.product
        && transaction.date === order.date
        && transaction.price === order.price;
    });
    return {
      ...order,
      transactions: matchedTransactions,
    };
  });
  const ordersWithTransactions = matchedRecords.filter((record) => record.transactions.length > 0);
  return ordersWithTransactions;
}

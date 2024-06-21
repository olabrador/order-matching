import { MatchedRecord, Order, Thresholds, Transaction } from '../types';
import getSimilarityPercentage from './getSimilarityPercentage';
import isLikelyMatch from "./isLikelyMatch";

export default function matchRecords(
  orders: Order[],
  transactions: Transaction[],
  thresholds: Thresholds,
): MatchedRecord[] {
  const matchedRecords: MatchedRecord[] = orders.map((order) => {
    const matchedTransactions = transactions
      .map((transaction) => ({
        ...transaction,
        customerNameSimilarity: getSimilarityPercentage(order.customerName, transaction.customerName),
        orderIdSimilarity: getSimilarityPercentage(order.orderId, transaction.orderId),
        productSimilarity: getSimilarityPercentage(order.product, transaction.product),
      }))
      .filter(({ customerNameSimilarity, orderIdSimilarity, productSimilarity }) => isLikelyMatch({
        similarities: {
          customerNameSimilarity,
          orderIdSimilarity,
          productSimilarity,
        },
        thresholds,
      }));
    return {
      ...order,
      transactions: matchedTransactions,
    };
  });
  const ordersWithTransactions = matchedRecords.filter((record) => record.transactions.length > 0);
  return ordersWithTransactions;
}

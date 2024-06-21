import { Order, Thresholds, Transaction } from '../types';
import getSimilarityPercentage from "./getSimilarityPercentage";

type IsLikelyMatchParams = {
  order?: Order;
  transaction?: Transaction;
  similarities?: {
    customerNameSimilarity: number;
    orderIdSimilarity: number;
    productSimilarity: number;
  };
  thresholds: Thresholds;
};

export default function isLikelyMatch({
  order,
  transaction,
  thresholds,
  similarities,
}: IsLikelyMatchParams): boolean {
  if (order && transaction) {
    const customerSimilarity = getSimilarityPercentage(order.customerName, transaction.customerName);
    const orderIdSimilarity = getSimilarityPercentage(order.orderId, transaction.orderId);
    const productSimilarity = getSimilarityPercentage(order.product, transaction.product);
    return (
      customerSimilarity >= thresholds.customerNameSimilarity
      && orderIdSimilarity >= thresholds.orderIdSimilarity
      && productSimilarity >= thresholds.productSimilarity
      && order.date === transaction.date
      && order.price === transaction.price
    );
  }

  if (similarities) {
    return (
      similarities.customerNameSimilarity >= thresholds.customerNameSimilarity
      && similarities.orderIdSimilarity >= thresholds.orderIdSimilarity
      && similarities.productSimilarity >= thresholds.productSimilarity
    );
  }
  return false;
}

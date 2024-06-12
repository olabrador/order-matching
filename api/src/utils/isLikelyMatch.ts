import { Order, Thresholds, Transaction } from "src/types";
import getSimilarityPercentage from "./getSimilarityPercentage";

export default function isLikelyMatch(
  order: Order,
  transaction: Transaction,
  thresholds: Thresholds,
): boolean {
  const customerSimilarity = getSimilarityPercentage(order.customerName, transaction.customerName);
  const orderIdSimilarity = getSimilarityPercentage(order.id, transaction.orderId);
  const productSimilarity = getSimilarityPercentage(order.product, transaction.product);
  return (
    customerSimilarity >= thresholds.customerNameSimilarity
    && orderIdSimilarity >= thresholds.orderIdSimilarity
    && productSimilarity >= thresholds.productSimilarity
    && order.date === transaction.date
    && order.price === transaction.price
  );
}

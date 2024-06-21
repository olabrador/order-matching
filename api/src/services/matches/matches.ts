import { db } from "src/lib/db";
import { MutationResolvers, QueryResolvers } from "types/graphql";
import { order } from "../orders/orders";
import { transactions } from "../transactions/transactions";

export const orderMatches: QueryResolvers["orderMatches"] = async ({ orderId }) => {
  return db.match.findMany({
    where: {
      orderId,
    },
    include: {
      order: true,
      transaction: true,
    },
    orderBy: [
      {
        customerNameSimilarity: 'desc',
      },
      {
        orderIdSimilarity: 'desc',
      },
      {
        productSimilarity: 'desc',
      },
    ],
  });
};

export const allPossibleTransactions: QueryResolvers["allPossibleTransactions"] = async ({ orderId }) => {
  const orderToMatch = await order({ id: orderId });
  if (!orderToMatch) {
    return [];
  }

  const matches = await db.match.findMany();

  return transactions({
    filter: {
      date: orderToMatch.date,
      price: orderToMatch.price,
      excludeIds: matches.map((match) => match.transactionId),
    },
  });
};

export const updateMatch: MutationResolvers['updateMatch'] = async ({
  id,
  input,
}) => {
  return db.match.update({
    data: input,
    where: { id },
  });
};

export const createMatch: MutationResolvers['createMatch'] = async ({
  input,
}) => {
  return db.match.create({
    data: input,
  });
};

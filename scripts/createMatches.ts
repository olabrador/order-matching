import { db } from 'api/src/lib/db';
import { MatchStatus } from '../types';
import { matchRecords } from '../utils';

export default async () => {
  const matches = await db.match.findMany({
    where: {
      status: MatchStatus.verified,
      OR: [{ status: MatchStatus.rejected }],
    },
  });
  console.log('Verified and rejected matches: ', JSON.stringify(matches, null, 2));
  const [orders, transactions, thresholds] = await Promise.all([
    db.order.findMany({
      where: {
        id: {
          notIn: matches.map((match) => match.orderId),
        },
      },
    }),
    db.transaction.findMany({
      where: {
        id: {
          notIn: matches.map((match) => match.transactionId),
        },
      },
    }),
    db.threshold.findMany(),
  ]);
  console.log('Orders: ', JSON.stringify(orders, null, 2));
  console.log('Transactions: ', JSON.stringify(transactions, null, 2));
  console.log('Thresholds: ', JSON.stringify(thresholds, null, 2));
  const matchedRecords = matchRecords(orders, transactions, {
    customerNameSimilarity: thresholds.find((threshold) => threshold.name === 'customerNameSimilarity')?.value || 80,
    orderIdSimilarity: thresholds.find((threshold) => threshold.name === 'orderIdSimilarity')?.value || 80,
    productSimilarity: thresholds.find((threshold) => threshold.name === 'productSimilarity')?.value || 80,
  });
  console.log('Matched records: ', JSON.stringify(matchedRecords, null, 2));
  console.log(
    'Transactions not matched',
    JSON.stringify(
      transactions.filter((transaction) => !matchedRecords.some((record) => record.transactions.some((t) => t.id === transaction.id))),
      null,
      2,
    ),
  );

  const matchesToCreate = matchedRecords.flatMap((record) =>
    record.transactions.map((transaction) => ({
      status: MatchStatus.unverified,
      orderId: record.id,
      transactionId: transaction.id,
      customerNameSimilarity: transaction.customerNameSimilarity,
      orderIdSimilarity: transaction.orderIdSimilarity,
      productSimilarity: transaction.productSimilarity,
    })),
  );
  console.log('Matches to create: ', JSON.stringify(matchesToCreate, null, 2));
  await db.match.createMany({
    data: matchesToCreate,
  });
};

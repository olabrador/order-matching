import { faker } from '@faker-js/faker';
import { db } from 'api/src/lib/db';
import { Order, Transaction } from 'types/index';
import { typoGenerator } from '../utils';

export default async () => {
  try {
    // Manually seed via `yarn rw prisma db seed`
    // Seeds automatically with `yarn rw prisma migrate dev` and `yarn rw prisma migrate reset`
    const orders: Pick<
      Order,
      'orderId'
      | 'type'
      | 'customerName'
      | 'date'
      | 'product'
      | 'price'
    >[] = [];
    const transactions: Pick<
      Transaction,
      'type'
      | 'customerName'
      | 'orderId'
      | 'date'
      | 'product'
      | 'price'
      | 'transactionType'
      | 'transactionDate'
      | 'transactionAmount'
    >[] = [];
    const thresholds: { name: string; value: number }[] = [
      {
        name: 'customerNameSimilarity',
        value: 75,
      },
      {
        name: 'orderIdSimilarity',
        value: 70,
      },
      {
        name: 'productSimilarity',
        value: 70,
      },
    ];
    // Generate 500 orders
    for (let i = 0; i < 500; i++) {
      const order = {
        orderId: faker.string.nanoid({ min: 6, max: 10 }),
        type: 'order',
        customerName: faker.person.fullName(),
        date: faker.date.past().toISOString().split('T')[0],
        product: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price()),
      };
      orders.push(order);
    }
    // Generate 1000 transactions with some errors
    for (let i = 0; i < 1000; i++) {
      const order = orders[Math.floor(Math.random() * orders.length)];

      let customerName = order.customerName;
      let orderId = order.orderId;
      let product = order.product;

      // Introduce typos in 60% of the transactions
      if (Math.random() < 0.6) {
        customerName = typoGenerator(customerName);
        orderId = typoGenerator(orderId);
        product = typoGenerator(product);
      }

      const transaction = {
        type: 'transaction',
        customerName: customerName,
        orderId: orderId,
        date: order.date,
        product: product,
        price: order.price,
        transactionType: faker.finance.transactionType(),
        transactionDate: faker.date.between({ from: order.date, to: new Date() }).toISOString().split('T')[0],
        transactionAmount: parseFloat(faker.finance.amount()),
      };
      transactions.push(transaction);
    }
    console.log(
      "\nUsing the default './scripts/seed.ts' template\nEdit the file to add seed data\n"
    );

    await db.$connect();
    if ((await db.order.count()) === 0) {
      await Promise.all(
        orders.map(async (data: Order) => {
          console.log({ data });
          const record = await db.order.create({ data });
          console.log(record);
        })
      );
    } else {
      console.log('Orders already seeded');
    }

    if ((await db.transaction.count()) === 0) {
      await Promise.all(
        transactions.map(async (data: Transaction) => {
          const record = await db.transaction.create({ data });
          console.log(record);
        })
      );
    } else {
      console.log('Transactions already seeded');
    }

    if ((await db.threshold.count() === 0)) {
      await Promise.all(
        thresholds.map(async (data) => {
          const record = await db.threshold.create({ data });
          console.log(record);
        })
      );
    } else {
      console.log('Thresholds already seeded');
    }
  } catch (error) {
    console.warn('Please define your seed data.');
    console.error(error);
  } finally {
    await db.$disconnect();
  }
}

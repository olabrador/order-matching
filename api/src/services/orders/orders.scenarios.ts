import type { Prisma, Order } from '@prisma/client';
import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.OrderCreateArgs>({
  order: {
    one: {
      data: {
        orderId: 'String',
        type: 'String',
        customerName: 'String',
        date: 'String',
        product: 'String',
        price: 5693204.198856321,
      },
    },
    two: {
      data: {
        orderId: 'String',
        type: 'String',
        customerName: 'String',
        date: 'String',
        product: 'String',
        price: 1426287.2399490357,
      },
    },
  },
});

export type StandardScenario = ScenarioData<Order, 'order'>;

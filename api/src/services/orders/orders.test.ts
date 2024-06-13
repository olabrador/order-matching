import type { Order } from '@prisma/client';

import { orders, order, createOrder, updateOrder, deleteOrder } from './orders';
import type { StandardScenario } from './orders.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('orders', () => {
  scenario('returns all orders', async (scenario: StandardScenario) => {
    const result = await orders();

    expect(result.length).toEqual(Object.keys(scenario.order).length);
  });

  scenario('returns a single order', async (scenario: StandardScenario) => {
    const result = await order({ id: scenario.order.one.id });

    expect(result).toEqual(scenario.order.one);
  });

  scenario('creates a order', async () => {
    const result = await createOrder({
      input: {
        orderId: 'String',
        type: 'String',
        customerName: 'String',
        date: 'String',
        product: 'String',
        price: 9032581.048865907,
      },
    });

    expect(result.orderId).toEqual('String');
    expect(result.type).toEqual('String');
    expect(result.customerName).toEqual('String');
    expect(result.date).toEqual('String');
    expect(result.product).toEqual('String');
    expect(result.price).toEqual(9032581.048865907);
  });

  scenario('updates a order', async (scenario: StandardScenario) => {
    const original = (await order({ id: scenario.order.one.id })) as Order;
    const result = await updateOrder({
      id: original.id,
      input: { orderId: 'String2' },
    });

    expect(result.orderId).toEqual('String2');
  });

  scenario('deletes a order', async (scenario: StandardScenario) => {
    const original = (await deleteOrder({
      id: scenario.order.one.id,
    })) as Order;
    const result = await order({ id: original.id });

    expect(result).toEqual(null);
  });
});

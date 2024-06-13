import type {
  DeleteOrderMutation,
  DeleteOrderMutationVariables,
  FindOrders,
} from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import type { TypedDocumentNode } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { QUERY } from 'src/components/Order/OrdersCell';
import { timeTag, truncate } from 'src/lib/formatters';
import Table from 'src/components/common/Table';

const DELETE_ORDER_MUTATION: TypedDocumentNode<
  DeleteOrderMutation,
  DeleteOrderMutationVariables
> = gql`
  mutation DeleteOrderMutation($id: Int!) {
    deleteOrder(id: $id) {
      id
    }
  }
`;

const OrdersList = ({ orders }: FindOrders) => {
  const [deleteOrder] = useMutation(DELETE_ORDER_MUTATION, {
    onCompleted: () => {
      toast.success('Order deleted');
    },
    onError: (error) => {
      toast.error(error.message);
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  });

  const onDeleteClick = (id: DeleteOrderMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete order ' + id + '?')) {
      deleteOrder({ variables: { id } });
    }
  };

  return (
    <Table
      items={orders}
      columns={[
        { key: 'id', title: 'Id' },
        { key: 'orderId', title: 'Order id' },
        { key: 'customerName', title: 'Customer name' },
        { key: 'date', title: 'Date' },
        { key: 'product', title: 'Product' },
        { key: 'price', title: 'Price' },
      ]}
      routes={{
        showRoute: routes.order,
        editRoute: routes.editOrder,
      }}
      onDelete={onDeleteClick}
    />
  );
};

export default OrdersList;

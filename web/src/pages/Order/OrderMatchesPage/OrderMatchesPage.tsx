import OrderMatchesCell from 'src/components/Order/OrderMatchesCell';

type OrderMatchesPageProps = {
  orderId: number;
};

const OrderMatchesPage = ({ orderId }: OrderMatchesPageProps) => {
  return <OrderMatchesCell orderId={orderId} />;
};

export default OrderMatchesPage;

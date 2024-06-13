import OrderCell from 'src/components/Order/OrderCell';

type OrderPageProps = {
  id: number;
};

const OrderPage = ({ id }: OrderPageProps) => {
  return <OrderCell id={id} />;
};

export default OrderPage;

import EditOrderCell from 'src/components/Order/EditOrderCell';

type OrderPageProps = {
  id: number;
};

const EditOrderPage = ({ id }: OrderPageProps) => {
  return <EditOrderCell id={id} />;
};

export default EditOrderPage;

import type { EditOrderById, UpdateOrderInput } from 'types/graphql';

import type { RWGqlError } from '@redwoodjs/forms';
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms';

type FormOrder = NonNullable<EditOrderById['order']>;

interface OrderFormProps {
  order?: EditOrderById['order'];
  onSave: (data: UpdateOrderInput, id?: FormOrder['id']) => void;
  error: RWGqlError;
  loading: boolean;
}

const OrderForm = (props: OrderFormProps) => {
  const onSubmit = (data: FormOrder) => {
    props.onSave(data, props?.order?.id);
  };

  return (
    <div className="rw-form-wrapper">
      <Form<FormOrder> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="orderId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Order id
        </Label>

        <TextField
          name="orderId"
          defaultValue={props.order?.orderId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="orderId" className="rw-field-error" />

        <Label
          name="type"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Type
        </Label>

        <TextField
          name="type"
          defaultValue={props.order?.type}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="type" className="rw-field-error" />

        <Label
          name="customerName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Customer name
        </Label>

        <TextField
          name="customerName"
          defaultValue={props.order?.customerName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="customerName" className="rw-field-error" />

        <Label
          name="date"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Date
        </Label>

        <TextField
          name="date"
          defaultValue={props.order?.date}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="date" className="rw-field-error" />

        <Label
          name="product"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Product
        </Label>

        <TextField
          name="product"
          defaultValue={props.order?.product}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="product" className="rw-field-error" />

        <Label
          name="price"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Price
        </Label>

        <TextField
          name="price"
          defaultValue={props.order?.price}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="price" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default OrderForm;

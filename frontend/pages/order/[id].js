import { useQuery } from '@apollo/client';
import Head from 'next/head';
import { SINGLE_ORDER_QUERY } from '../../lib/queries';
import DisplayError from '../../components/ErrorMessage';
import OrderStyles from '../../components/styles/OrderStyles';
import formatMoney from '../../lib/formatMoney';

export default function SingleOrderPage({ query }) {
  const { data, error, loading } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { id: query.id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  const { order } = data;

  return (
    <OrderStyles>
      <Head>
        <title>Nx store | Order {order.id}</title>
      </Head>
      <p>
        <span>Order Id:</span>
        <span>{order.id}</span>
      </p>
      <p>
        <span>Charge:</span>
        <span>{order.charge}</span>
      </p>
      <p>
        <span>Order total:</span>
        <span>{formatMoney(order.total)}</span>
      </p>
      <p>
        <span>Items:</span>
        <span>{order.items.length}</span>
      </p>
      <div className="items">
        {order.items.map((item) => (
          <div className="order-item" key={item.id}>
            <img src={item.photo.image.publicUrlTransformed} alt={item.name} />
            <div className="item-details">
              <h2>{item.name}</h2>
              <p>Quantity: {item.quantity}</p>
              <p>Unit price: {formatMoney(item.price)}</p>
              <p>Sub total: {formatMoney(item.price * item.quantity)}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  );
}

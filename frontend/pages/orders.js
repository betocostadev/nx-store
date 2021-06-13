import Link from 'next/link';
import Head from 'next/head';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { USER_ORDERS_QUERY } from '../lib/queries';

import DisplayError from '../components/ErrorMessage';
import OrderItemStyles from '../components/styles/OrderItemStyles';
import formatMoney from '../lib/formatMoney';

export default function OrdersPage() {
  const { data, error, loading } = useQuery(USER_ORDERS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  const { allOrders } = data;

  const OrderUl = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    grid-gap: 4rem;
  `;

  function countItemsInTheOrder(order) {
    return order.items.reduce((tally, item) => tally + item.quantity, 0);
  }

  return (
    <div>
      <Head>
        <title>Nx store | Your orders ({allOrders.length})</title>
      </Head>
      <h2>You have {allOrders.length} orders</h2>
      <OrderUl>
        {allOrders.map((order) => (
          <OrderItemStyles key={order.id}>
            <Link href={`/order/${order.id}`}>
              <a>
                <div className="order-meta">
                  <p>{countItemsInTheOrder(order)} items</p>
                  <p>
                    {order.items.length} product
                    {order.items.length === 1 ? '' : 's'}
                  </p>
                  <p>{formatMoney(order.total)}</p>
                </div>
                <div className="images">
                  {order.items.map((item) => (
                    <img
                      key={item.id}
                      src={item.photo?.image?.publicUrlTransformed}
                      alt={item.name}
                    />
                  ))}
                </div>
              </a>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderUl>
    </div>
  );
}

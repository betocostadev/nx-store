import { useMutation } from '@apollo/client';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import nProgress from 'nprogress';
import { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../lib/cartState';
import { CREATE_ORDER_MUTATION, CURRENT_USER_QUERY } from '../lib/queries';
import SickButton from './styles/SickButton';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 0.5rem;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const stripLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function CheckoutForm() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const [checkout, { error: graphQLError }] = useMutation(
    CREATE_ORDER_MUTATION,
    { refetchQueries: [{ query: CURRENT_USER_QUERY }] }
  );

  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { toggleCart } = useCart();

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    nProgress.start();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    // test 4242 4242 4242 4242 02/22 222 22222
    console.log(paymentMethod);

    if (error) {
      setError(error);
      nProgress.done();
      return; // stop the checkout if there are errors
    }

    const order = await checkout({
      variables: {
        token: paymentMethod.id,
      },
    });

    setLoading(false);
    nProgress.done();

    if (order) {
      toggleCart();

      router.push({
        pathname: '/order/[id]',
        query: { id: order.data.checkout.id },
      });
    }
  }

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 14 }}>{error.message}</p>}
      {graphQLError && <p style={{ fontSize: 14 }}>{graphQLError.message}</p>}
      <CardElement />
      <SickButton disabled={loading}>Checkout now</SickButton>
    </CheckoutFormStyles>
  );
}

export default function Checkout() {
  return (
    <Elements stripe={stripLib}>
      <CheckoutForm />
    </Elements>
  );
}

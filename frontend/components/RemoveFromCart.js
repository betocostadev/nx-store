import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { REMOVE_FROM_CART_MUTATION } from '../lib/queries';

const BigButton = styled.button`
  font-size: 3rem;
  padding-right: 1rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--indigo700);
    cursor: pointer;
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

export default function RemoveFromCart({ id }) {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
    update,
    // optimisticResponse: {
    //   deleteCartItem: {
    //     __typename: 'CartItem',
    //     id,
    //   },
    // },
  });

  return (
    <BigButton
      type="button"
      title="Remove this item"
      onClick={removeFromCart}
      disabled={loading}
    >
      &times;
    </BigButton>
  );
}

import { useMutation } from '@apollo/client';
import { ADD_TO_CART_MUTATION, CURRENT_USER_QUERY } from '../lib/queries';

export default function AddToCart({ id }) {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <button type="button" disabled={loading} onClick={addToCart}>
      Add{loading && 'ing'} to Cart 🛒
    </button>
  );
}

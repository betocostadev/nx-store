import { useMutation } from '@apollo/client';
import { DELETE_PRODUCT_MUTATION } from '../lib/queries';

export default function DeleteProduct({ id, children }) {
  async function update(cache, payload) {
    // console.log(payload);
    // console.log('You need to identify the item in the cache to delete it');
    cache.evict(cache.identify(payload.data.deleteProduct));
  }

  const [deleteProduct, { loading, error, data }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      variables: id,
      update,
    }
  );

  async function handleDelete() {
    if (confirm('are you sure you want to delete this item?')) {
      await deleteProduct({ variables: { id } });

      if (error) {
        alert(error.message);
      }
    }
  }

  return (
    <button type="button" disabled={loading} onClick={handleDelete}>
      {children}
    </button>
  );
}

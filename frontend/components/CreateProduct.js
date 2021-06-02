import Router from 'next/router';
import { useMutation } from '@apollo/client';
import useForm from '../lib/useForm';

import DisplayError from './ErrorMessage';
import Form from './styles/Form';

import { ALL_PRODUCTS_QUERY, CREATE_PRODUCT_MUTATION } from '../lib/queries';

export default function CreateProduct() {
  // resetForm, clearForm
  const { inputs, handleChange, clearForm } = useForm({
    image: '',
    name: '',
    price: 100000,
    description: '',
  });

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await createProduct();
    clearForm();
    Router.push({
      pathname: `/product/${res.data.createProduct.id}`,
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={error} />

      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input
            required
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </label>

        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
      </fieldset>

      <button type="submit">+ Add product</button>
    </Form>
  );
}

// <button type="button" onClick={clearForm}>
//   Clear form
// </button>

// <button type="button" onClick={resetForm}>
//   Reset form
// </button>

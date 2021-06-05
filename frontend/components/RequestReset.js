import { useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import { REQUEST_RESET_MUTATION } from '../lib/queries';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });

  const [requestReset, { data, error, loading }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  async function handleSubmit(e) {
    e.preventDefault();
    await requestReset().catch(console.error);

    resetForm();
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Request password reset</h2>
      {error && <DisplayError error={error} />}

      <fieldset>
        {data && data.sendUserPasswordResetLink === null ? (
          <p>
            Password reset success! Please, check your e-mail for a link to
            create your new password
          </p>
        ) : null}

        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            placeholder="Your email address"
            autoComplete="email"
          />
        </label>

        <button type="submit">Request Reset!</button>
      </fieldset>
    </Form>
  );
}

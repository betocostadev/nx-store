import { useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import { RESET_MUTATION } from '../lib/queries';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';

export default function Reset({ token }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });

  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });

  const resetError = data?.redeemUserPasswordResetToken?.code
    ? data.redeemUserPasswordResetToken
    : undefined;

  async function handleSubmit(e) {
    e.preventDefault();
    await reset().catch(console.error);
    resetForm();
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Fill the form below to reset your password</h2>
      {error || resetError ? (
        <DisplayError error={error || resetError} />
      ) : null}

      <fieldset>
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

        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            placeholder="Password"
            autoComplete="password"
          />
        </label>

        <button type="submit">Request Reset!</button>
      </fieldset>
    </Form>
  );
}

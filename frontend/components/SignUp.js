import { useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import { SIGNUP_MUTATION } from '../lib/queries';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';

export default function SignUp() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    name: '',
    password: '',
  });

  const [signup, { data, error, loading }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await signup().catch(console.error);

    resetForm();
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Up for an account</h2>
      {error && <DisplayError error={error} />}

      <fieldset>
        {data && data.createUser ? (
          <p>
            Signed up successfully with the email {data.createUser.email}. Use
            your credentials to Sign In
          </p>
        ) : null}
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            placeholder="Your name"
            autoComplete="name"
          />
        </label>

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
        <button type="submit">Sign Up!</button>
      </fieldset>
    </Form>
  );
}

import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY, SIGNIN_MUTATION } from '../lib/queries';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';

export default function SignIn() {
  const router = useRouter();

  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  const [signIn, { data, error, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await signIn();
    resetForm();
  }

  const loginSuccess =
    data?.authenticateUserWithPassword?.__typename ===
    'UserAuthenticationWithPasswordSuccess';

  if (loginSuccess) {
    if (!error && !loading) {
      router.push({
        pathname: '/account',
      });
    }
  }

  const loginError =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign into your account</h2>

      {loading && <p>Loading ...</p>}

      {loginError && <DisplayError error={loginError || error} />}

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
        <button type="submit">Sign In!</button>
      </fieldset>
    </Form>
  );
}

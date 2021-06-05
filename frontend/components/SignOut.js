import Router from 'next/router';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY, SIGNOUT_MUTATION } from '../lib/queries';

export default function SignOut() {
  const [signout] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSignOut() {
    signout();
    Router.push({
      pathname: `/signin/`,
    });
  }

  return (
    <button type="button" onClick={handleSignOut}>
      Sign Out
    </button>
  );
}

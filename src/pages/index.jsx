import Page from 'components/Page';
import Login from 'components/Login';
import { useContext } from 'react';
import { AuthenticatedContext } from 'components/Authenticated';

export default function Home() {
  const { user, isLoggedIn } = useContext(AuthenticatedContext);
  console.log('current user', user, isLoggedIn);
  return (
    <Page>
      <Login />
    </Page>
  );
}

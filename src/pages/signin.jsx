import { useRouter } from 'next/router';
import Page from 'components/Page';
import Login from 'components/Login';
import { useContext, useEffect } from 'react';
import { AuthenticatedContext } from 'components/Authenticated';

export default function SignIn() {
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthenticatedContext);
  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn]);
  return (
    <Page>
      <Login />
    </Page>
  );
}

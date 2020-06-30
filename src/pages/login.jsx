import { useRouter } from 'next/router';
import Page from 'components/Page';
import Login from 'components/Login';
import { useContext, useEffect } from 'react';
import { AuthenticatedContext } from 'components/Authenticated';
import Authentication from 'components/Authentication';

export default function SignIn() {
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthenticatedContext);
  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn]);
  return (
    <Page title={`${process.env.NEXT_PUBLIC_PROJECT_NAME} - Log In`}>
      <Authentication type="login">
        <Login />
      </Authentication>
    </Page>
  );
}

import { useRouter } from 'next/router';
import Page from 'components/Page';
import Login from 'components/Login';
import { useContext, useEffect } from 'react';
import { AuthenticatedContext } from 'components/Authenticated';
import Authentication from 'components/Authentication';

export default function SignIn() {
  const router = useRouter();
  const { query } = router;
  const { isLoggedIn } = useContext(AuthenticatedContext);
  useEffect(() => {
    const { redirect } = query;
    if (isLoggedIn && redirect) {
      router.push(...redirect);
    } else if (isLoggedIn && !redirect) {
      router.push('/');
    }
  }, [isLoggedIn]);
  return (
    <Page title={`${process.env.NEXT_PUBLIC_PROJECT_NAME} - Log In`}>
      <Authentication query={query} type="login">
        <Login />
      </Authentication>
    </Page>
  );
}

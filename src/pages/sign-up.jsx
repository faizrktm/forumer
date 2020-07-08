import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Page from 'components/Page';
import { AuthenticatedContext } from 'components/Authenticated';
import SignUp from 'components/SignUp';
import Authentication from 'components/Authentication';

export default function Register() {
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
    <Page title={`${process.env.NEXT_PUBLIC_PROJECT_NAME} - Sign Up`}>
      <Authentication query={query} type="sign-up">
        <SignUp />
      </Authentication>
    </Page>
  );
}

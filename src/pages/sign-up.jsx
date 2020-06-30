import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Page from 'components/Page';
import { AuthenticatedContext } from 'components/Authenticated';
import SignUp from 'components/SignUp';
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
    <Page title={`${process.env.NEXT_PUBLIC_PROJECT_NAME} - Sign Up`}>
      <Authentication type="sign-up">
        <SignUp />
      </Authentication>
    </Page>
  );
}

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Page from 'components/Page';
import { AuthenticatedContext } from 'components/Authenticated';
import SignUp from 'components/SignUp';

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
      <SignUp />
    </Page>
  );
}

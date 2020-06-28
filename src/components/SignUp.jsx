import {
  memo,
  useContext,
  useState,
  useRef,
} from 'react';
import {
  Box,
  Form,
  FormField,
  TextInput,
  Button,
  Text,
  Anchor,
} from 'grommet';
import { useRouter } from 'next/router';
import ReCAPTCHA from 'react-google-recaptcha';

import { AuthenticatedContext } from './Authenticated';
import Card from './Card';
import SocialLogin from './SocialLogin';
import Loading from './Loading';

const Login = () => {
  const [status, setStatus] = useState('idle');
  const { register } = useContext(AuthenticatedContext);
  const router = useRouter();
  const refCaptcha = useRef();

  const onSubmit = async ({ value }) => {
    let captcha = null;
    if (refCaptcha.current) {
      captcha = refCaptcha.current.getValue();
    }
    if (status === 'loading' || !captcha) return;
    try {
      setStatus('loading');
      await register(value);
      setStatus('idle');
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <Card>
      <Box pad="16px" gap="small">
        <Box>
          <Form onSubmit={onSubmit}>
            <FormField name="email" label="Email">
              <TextInput name="email" required type="email" />
            </FormField>
            <FormField name="password" label="Password">
              <TextInput name="password" type="password" required />
            </FormField>
            {status !== 'idle' && status !== 'loading' && (
              <Text color="status-error" size="small">{status}</Text>
            )}
            <Box margin={{ top: 'medium' }}>
              <ReCAPTCHA
                ref={refCaptcha}
                sitekey={process.env.NEXT_PUBLIC_CAPTCHA_KEY}
              />
            </Box>
            <Box margin={{ top: 'small' }}>
              <Button type="submit" label="Continue" primary />
            </Box>
          </Form>
        </Box>
        <SocialLogin />
        <Box align="center" justify="center">
          <Box width="20%" border={{ color: 'placeholder', size: '1px', side: 'bottom' }} background="placeholder" margin={{ vertical: 'small' }} />
          <Anchor
            label={<Text weight="bold" size="small" color="text">Already a Member? Log In</Text>}
            onClick={() => router.push('/login')}
          />
        </Box>
      </Box>
      {status === 'loading' && <Loading text="Processing..." />}
    </Card>
  );
};

export default memo(Login);

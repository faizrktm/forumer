import {
  useContext,
  memo,
  useRef,
} from 'react';
import {
  Box,
  Form,
  FormField,
  TextInput,
  Button,
  Text,
} from 'grommet';
import ReCAPTCHA from 'react-google-recaptcha';

import { AuthenticatedContext } from './Authenticated';
import { StatusContext } from './StatusWrapper';

const Login = () => {
  const refCaptcha = useRef();
  const {
    status,
    setLoading,
    setIdle,
    setError,
  } = useContext(StatusContext);
  const { login } = useContext(AuthenticatedContext);

  const onSubmit = async ({ value }) => {
    let captcha = null;
    if (refCaptcha.current) {
      captcha = refCaptcha.current.getValue();
    }
    if (status === 'loading' || !captcha) return;
    try {
      setLoading();
      await login('form', value);
      setIdle();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
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
      <Box margin={{ top: 'medium' }}>
        <Button type="submit" label="Log In" primary />
      </Box>
    </Form>
  );
};

export default memo(Login);

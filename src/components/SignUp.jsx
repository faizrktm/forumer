import {
  memo,
  useContext,
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

import { password } from 'helper/validation';
import { AuthenticatedContext } from './Authenticated';
import { StatusContext } from './StatusWrapper';

const Login = () => {
  const {
    status,
    setIdle,
    setLoading,
    setError,
  } = useContext(StatusContext);
  const { register } = useContext(AuthenticatedContext);
  const refCaptcha = useRef();

  const onSubmit = async ({ value }) => {
    let captcha = null;
    if (refCaptcha.current) {
      captcha = refCaptcha.current.getValue();
    }
    if (status === 'loading' || !captcha) return;
    try {
      setLoading();
      await register(value);
      setIdle();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormField name="email" label="Email" required>
        <TextInput name="email" required type="email" />
      </FormField>
      <FormField name="password" label="Password" required validate={password}>
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
  );
};

export default memo(Login);

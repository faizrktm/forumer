import {
  memo, useRef, useContext, useCallback,
} from 'react';
import {
  Form,
  FormField,
  Text,
  TextInput,
  Box,
  Button,
} from 'grommet';
import PropTypes from 'prop-types';

import { addComment } from 'helper/posts';
import { AuthenticatedContext } from 'components/Authenticated';
import { ReduxerContext } from 'components/Reduxer';
import Card from 'components/Card';
import { useRouter } from 'next/router';

const CommentForm = ({ reference }) => {
  const formRef = useRef(null);
  const { user, isLoggedIn } = useContext(AuthenticatedContext);
  const {
    mutate,
    error,
  } = useContext(ReduxerContext);
  const router = useRouter();

  const onSubmit = async ({ value }) => {
    if (formRef.current) formRef.current.reset();
    mutate(() => addComment(reference, value, user));
  };

  const onNavigateToLogin = useCallback((e) => {
    e.preventDefault();
    router.push({
      pathname: '/login',
      query: {
        redirect: ['/posts/[id]', `/posts/${reference}`],
      },
    });
  }, []);

  if (!isLoggedIn) {
    return (
      <Box alignSelf="start">
        <Button
          label="Please login to comment"
          primary
          color="brand"
          onClick={onNavigateToLogin}
        />
      </Box>
    );
  }

  return (
    <Card>
      <Box pad="16px">
        <Form onSubmit={onSubmit} ref={formRef}>
          <FormField name="content" required>
            <TextInput required name="content" placeholder="Write a comment..." />
          </FormField>
          {error && <Text size="small" color="status-error">{error.message}</Text>}
          <Box margin={{ top: 'small' }}>
            <Button type="submit" color="brand" primary label="Comment" />
          </Box>
        </Form>
      </Box>
    </Card>
  );
};

CommentForm.propTypes = {
  reference: PropTypes.string.isRequired,
};

export default memo(CommentForm);

import { memo, useRef, useContext } from 'react';
import {
  Form,
  FormField,
  Text,
  TextInput,
} from 'grommet';
import PropTypes from 'prop-types';

import { addComment } from 'helper/posts';
import { AuthenticatedContext } from 'components/Authenticated';
import { ReduxerContext } from 'components/Reduxer';

const CommentForm = ({ reference }) => {
  const formRef = useRef(null);
  const { user, isLoggedIn } = useContext(AuthenticatedContext);
  const {
    data,
    mutate,
    error,
  } = useContext(ReduxerContext);

  const onSubmit = async ({ value }) => {
    if (formRef.current) formRef.current.reset();
    const payload = {
      ...value,
      reference,
      uid: user.user.uid,
    };
    mutate(() => addComment(payload, user, data[reference]), 'update');
  };

  if (!isLoggedIn) {
    return null;
  }
  return (
    <Form onSubmit={onSubmit} ref={formRef}>
      {error && <Text size="small" color="status-error">{error.message}</Text>}
      <FormField name="content" required>
        <TextInput size="small" required name="content" placeholder="Write a comment..." />
      </FormField>
    </Form>
  );
};

CommentForm.propTypes = {
  reference: PropTypes.string.isRequired,
};

export default memo(CommentForm);

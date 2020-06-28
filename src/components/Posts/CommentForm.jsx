import { memo, useRef, useContext } from 'react';
import { FormField, Form, TextInput } from 'grommet';
import PropTypes from 'prop-types';

import { addComment } from 'helper/posts';
import { AuthenticatedContext } from 'components/Authenticated';
import { ReduxerContext } from 'components/Reduxer';

const CommentForm = ({ reference }) => {
  const formRef = useRef(null);
  const { user, isLoggedIn } = useContext(AuthenticatedContext);
  const {
    data,
    update,
  } = useContext(ReduxerContext);

  const onSubmit = async ({ value }) => {
    if (formRef.current) formRef.current.reset();
    const payload = {
      ...value,
      reference,
      uid: user.user.uid,
    };
    await update(() => addComment(payload, user.token, data[reference]));
  };

  if (!isLoggedIn) {
    return null;
  }
  return (
    <Form onSubmit={onSubmit} ref={formRef}>
      <FormField name="content">
        <TextInput size="small" name="content" placeholder="Write a comment..." />
      </FormField>
    </Form>
  );
};

CommentForm.propTypes = {
  reference: PropTypes.string.isRequired,
};

export default memo(CommentForm);

import { memo, useContext } from 'react';
import { Box, Text } from 'grommet';
import PropTypes from 'prop-types';
import { ReduxerContext } from 'components/Reduxer';
import { timestampToHumans } from 'helper/times';

import CommentCard from './CommentCard';
import CommentForm from './CommentForm';

const Comments = ({ reference, totalComments }) => {
  const { data } = useContext(ReduxerContext);
  const lists = Object.keys(data || {});
  return (
    <Box gap="medium" margin={{ top: 'medium' }}>
      <CommentForm reference={reference} />
      <Box>
        <Text size="xlarge" weight="bold">
          Replies (
          {totalComments}
          )
        </Text>
      </Box>
      {lists.map((item) => (
        <CommentCard
          key={item}
          id={item}
          content={data[item].content}
          name={data[item].user.name}
          time={timestampToHumans(data[item].timestamp._seconds)}
        />
      ))}
    </Box>
  );
};

Comments.defaultProps = {
  totalComments: 0,
};

Comments.propTypes = {
  reference: PropTypes.string.isRequired,
  totalComments: PropTypes.number,
};

export default memo(Comments);

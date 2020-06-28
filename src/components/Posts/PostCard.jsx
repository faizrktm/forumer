import { memo } from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import Card from 'components/Card';
import { timestampToHumans } from 'helper/times';

import CommentForm from './CommentForm';
import CommentCard from './CommentCard';

const PostCard = ({
  id,
  content,
  name,
  time,
  comments,
}) => (
  <Card>
    <Box pad="16px">
      <Box
        margin={{ bottom: 'xsmall' }}
        pad={{ bottom: 'small' }}
        border={{ color: 'light-4', size: '0.5px', side: 'bottom' }}
      >
        <Text weight="bold">{name}</Text>
        <Text size="small" color="placeholder">{time}</Text>
        <Box margin={{ top: 'xsmall' }}>
          <Text size="large">{content}</Text>
        </Box>
      </Box>
      <Box>
        {Object.keys(comments).map((item) => (
          <CommentCard
            key={item}
            content={comments[item].content}
            name={comments[item].user.name}
            time={timestampToHumans(comments[item].timestamp._seconds)}
          />
        ))}
      </Box>
      <Box pad={{ top: 'small' }}>
        <CommentForm reference={id} />
      </Box>
    </Box>
  </Card>
);

PostCard.defaultProps = {
  comments: {},
};

PostCard.propTypes = {
  content: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  comments: PropTypes.oneOfType([PropTypes.object]),
  id: PropTypes.string.isRequired,
};

export default memo(PostCard);

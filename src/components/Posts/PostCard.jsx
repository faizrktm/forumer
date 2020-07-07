import { memo } from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Anchor } from 'grommet';
import { Tooltip, Share } from 'grommet-icons';

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
  withCommentBox,
  totalComments,
}) => (
  <Card>
    <Box pad="16px">
      <Box
        pad={{ bottom: 'medium' }}
        border={{ color: 'light-4', size: '0.5px', side: 'bottom' }}
      >
        <Box direction="row" align="center">
          <Box
            align="center"
            justify="center"
            width="40px"
            height="40px"
            round={{ size: '20px' }}
            margin={{ right: 'medium' }}
            background="sky"
          >
            <Text weight="bold" color="placeholder">{name[0]}</Text>
          </Box>
          <Box justify="between" alignSelf="stretch">
            <Text weight="bold">{name}</Text>
            <Text size="xsmall" color="placeholder">{time}</Text>
          </Box>
        </Box>
        <Box margin={{ top: 'medium' }}>
          <Text size="large">{content}</Text>
        </Box>
        {totalComments > 0 && (
        <Box alignSelf="end">
          <Anchor size="small" color="placeholder" label={`${totalComments} Comments`} />
        </Box>
        )}
      </Box>
      <Box direction="row" align="center" justify="around" pad={{ top: 'medium' }}>
        <Anchor size="small" label="Comment" color="placeholder" icon={<Tooltip size="16px" />} />
        <Anchor size="small" label="Share" color="placeholder" icon={<Share size="16px" />} />
      </Box>
      <Box>
        {comments && Object.keys(comments).map((item) => (
          <CommentCard
            key={item}
            content={comments[item].content}
            name={comments[item].user.name}
            time={timestampToHumans(comments[item].timestamp._seconds)}
          />
        ))}
      </Box>
      {withCommentBox && (
      <Box pad={{ top: 'small' }}>
        <CommentForm reference={id} />
      </Box>
      )}
    </Box>
  </Card>
);

PostCard.defaultProps = {
  comments: {},
  withCommentBox: true,
  totalComments: 0,
};

PostCard.propTypes = {
  content: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  comments: PropTypes.oneOfType([PropTypes.object]),
  id: PropTypes.string.isRequired,
  withCommentBox: PropTypes.bool,
  totalComments: PropTypes.number,
};

export default memo(PostCard);

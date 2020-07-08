import { memo } from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Anchor } from 'grommet';
import { Tooltip, Share } from 'grommet-icons';

import Card from 'components/Card';

const PostCard = ({
  content,
  name,
  time,
  totalComments,
  onClickComment,
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
          <Anchor onClick={onClickComment} size="small" color="placeholder" label={`${totalComments} Comments`} />
        </Box>
        )}
      </Box>
      <Box direction="row" align="center" justify="around" pad={{ top: 'medium' }}>
        <Anchor size="small" onClick={onClickComment} label="Comment" color="placeholder" icon={<Tooltip size="16px" />} />
        <Anchor size="small" label="Share" color="placeholder" icon={<Share size="16px" />} />
      </Box>
    </Box>
  </Card>
);

PostCard.defaultProps = {
  totalComments: 0,
  onClickComment: null,
};

PostCard.propTypes = {
  content: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  totalComments: PropTypes.number,
  onClickComment: PropTypes.func,
};

export default memo(PostCard);

import { Box, Text } from 'grommet';
import PropTypes from 'prop-types';
import { memo } from 'react';

const CommentCard = ({
  content,
  name,
  time,
}) => (
  <Box alignSelf="start" margin={{ top: 'xsmall' }}>
    <Box
      round="small"
      background="light-1"
      pad={{ horizontal: 'small', vertical: 'xsmall' }}
      alignSelf="start"
    >
      <Text weight="bold" size="xsmall">{name}</Text>
      <Box pad={{ top: 'xxsmall' }}>
        <Text size="small">{content}</Text>
      </Box>
    </Box>
    <Box pad={{ horizontal: 'small' }}>
      <Text size="xxsmall" color="placeholder">{time}</Text>
    </Box>
  </Box>
);

CommentCard.propTypes = {
  content: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default memo(CommentCard);

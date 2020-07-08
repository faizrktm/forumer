import { memo } from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';

import Card from 'components/Card';

const CommentCard = ({
  content,
  name,
  time,
}) => (
  <Card>
    <Box pad="16px">
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
    </Box>
  </Card>
);

CommentCard.propTypes = {
  content: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default memo(CommentCard);

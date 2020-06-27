import { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text } from 'grommet';

const Loading = ({ text }) => (
  <Container>
    <Text size="xxlarge" weight="bold" color="white">{text}</Text>
  </Container>
);

Loading.defaultProps = {
  text: 'Loading...',
};

Loading.propTypes = {
  text: PropTypes.string,
};

export default memo(Loading);

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 4;
  background-color: rgba(0,0,0, 0.2);
`;

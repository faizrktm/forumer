import styled from 'styled-components';
import { Text } from 'grommet';

const Header = () => (
  <Container>
    <Wrapper>
      <Text color="brand" size="xlarge" weight="bold">Forumer</Text>
    </Wrapper>
  </Container>
);

export default Header;

const Container = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  z-index: 11;
  background-color: white;
  border-bottom: 1px solid #E1E1E1;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 74px;
  width: 100%;
  margin: 0px auto;
  padding: 0px 16px;
`;

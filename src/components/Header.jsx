import { useContext } from 'react';
import styled from 'styled-components';
import {
  Anchor,
  Box,
  Text,
} from 'grommet';
import { AuthenticatedContext } from './Authenticated';

const Header = () => {
  const { logout, isLoggedIn } = useContext(AuthenticatedContext);
  return (
    <Container>
      <Wrapper>
        <Text color="brand" size="xlarge" weight="bold">{process.env.NEXT_PUBLIC_PROJECT_NAME}</Text>
        {isLoggedIn && (
          <Box>
            <Anchor label={<Text color="text" size="small">Logout</Text>} onClick={logout} />
          </Box>
        )}
      </Wrapper>
    </Container>
  );
};

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
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 74px;
  max-width: 480px;
  width: 100%;
  margin: 0px auto;
  padding: 0px 16px;
`;

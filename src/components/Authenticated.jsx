import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import authenticate, { validate } from 'helper/authenticate';

const AuthenticatedContext = React.createContext();

const AuthenticatedProvider = ({ children, user }) => {
  const [currentUser, setCurrentUser] = useState(user);
  const logout = () => {
    setCurrentUser(undefined);
  };

  // Just trying to refresh token if still exist.
  useEffect(() => {
    if (!user && typeof window !== 'undefined') {
      (async () => {
        try {
          const result = await validate();
          setCurrentUser(result);
        } catch (error) {
          console.log('token expired', error.message);
        }
      })();
    }
  }, []);

  const login = useCallback(async (type, body) => {
    try {
      const response = await authenticate(type, body);
      setCurrentUser(response);
    } catch (error) {
      console.log('error authenticate user', error.message);
    }
  }, []);

  return (
    <AuthenticatedContext.Provider value={{
      isLoggedIn: !!currentUser,
      user: currentUser,
      logout,
      login,
    }}
    >
      {children}
    </AuthenticatedContext.Provider>
  );
};

AuthenticatedProvider.defaultProps = {
  user: null,
};

AuthenticatedProvider.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string,
    email: PropTypes.string,
  }),
};

export { AuthenticatedProvider, AuthenticatedContext };

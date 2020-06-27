import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  signIn,
  validate,
  signUp,
  signOut,
} from 'helper/authenticate';

const AuthenticatedContext = React.createContext();

const AuthenticatedProvider = ({ children, user }) => {
  const [currentUser, setCurrentUser] = useState(user);
  const logout = () => {
    signOut();
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
          console.log(error.message);
        }
      })();
    }
  }, []);

  const login = useCallback(async (type, body) => {
    try {
      const response = await signIn(type, body);
      setCurrentUser(response);
      return true;
    } catch (error) {
      // console.log('error authenticate user', error.message);
      return Promise.reject(error);
    }
  }, []);

  const register = useCallback(async (body) => {
    try {
      const response = await signUp(body);
      setCurrentUser(response);
      return true;
    } catch (error) {
      // console.log('error authenticate user', error.message);
      return Promise.reject(error);
    }
  }, []);

  return (
    <AuthenticatedContext.Provider value={{
      isLoggedIn: !!currentUser,
      user: currentUser,
      logout,
      login,
      register,
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

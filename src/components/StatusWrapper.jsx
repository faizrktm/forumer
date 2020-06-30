import { useState } from 'react';
import PropTypes from 'prop-types';

const StatusContext = React.createContext();

const StatusProvider = ({ children }) => {
  const [status, setStatus] = useState('idle');

  const setLoading = () => {
    setStatus('loading');
  };
  const setIdle = () => {
    setStatus('idle');
  };
  const setError = (message) => {
    setStatus(message);
  };

  return (
    <StatusContext.Provider value={{
      status,
      setLoading,
      setIdle,
      setError,
    }}
    >
      {children}
    </StatusContext.Provider>
  );
};

StatusProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { StatusProvider, StatusContext };

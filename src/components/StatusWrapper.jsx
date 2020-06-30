import { useState } from 'react';
import PropTypes from 'prop-types';

const StatusContext = React.createContext();

const StatusProvider = ({ children }) => {
  const [status, setStatus] = useState('idle');

  const setLoading = () => {
    if (status === 'loading') return;
    setStatus('loading');
  };
  const setIdle = () => {
    if (status === 'idle') return;
    setStatus('idle');
  };
  const setError = (message) => {
    if (status === message) return;
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

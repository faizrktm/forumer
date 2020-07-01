import { useReducer } from 'react';
import PropTypes from 'prop-types';

const ReduxerContext = React.createContext({ data: {} });

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'REQUEST':
      return ({
        ...state,
        status: 'loading',
      });
    case 'SUCCESS':
      return ({
        status: 'idle',
        data: payload,
      });
    case 'FAILURE':
      return ({
        ...state,
        status: payload,
      });
    default:
      return state;
  }
}

const ReduxerProvider = ({ children, initialValue }) => {
  const [state, dispatch] = useReducer(reducer, { status: 'idle', data: initialValue });
  const { data, status } = state;

  /**
   *
   * @param {() => object} handler
   * handler must return single object that does not a list. e.g. {...data}
   */
  const update = async (handler) => {
    try {
      dispatch({ type: 'REQUEST' });
      const response = await handler();
      const payload = Object.keys(data).reduce((acc, curr) => {
        if (curr === response.id) {
          return ({ ...acc, [curr]: response });
        }
        return ({ ...acc, [curr]: data[curr] });
      }, {});
      dispatch({ type: 'SUCCESS', payload });
    } catch (error) {
      dispatch({ type: 'FAILURE', payload: error.message });
    }
  };

  /**
   *
   * @param {() => object} handler
   * handler must return object that contain id, eg: {[id]: data}
   */
  const add = async (handler) => {
    try {
      dispatch({ type: 'REQUEST' });
      const response = await handler();
      dispatch({ type: 'SUCCESS', payload: { ...response, ...data } });
    } catch (error) {
      dispatch({ type: 'FAILURE', payload: error.message });
    }
  };

  /**
   * @param {{[id]: data}} payload
   */
  const addRaw = (payload) => {
    dispatch({ type: 'SUCCESS', payload: { ...payload, ...data } });
  };

  return (
    <ReduxerContext.Provider value={{
      data,
      addRaw,
      add,
      update,
      status,
    }}
    >
      {children}
    </ReduxerContext.Provider>
  );
};

ReduxerProvider.defaultProps = {
  initialValue: null,
};

ReduxerProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialValue: PropTypes.oneOfType([PropTypes.object]),
};

export { ReduxerProvider, ReduxerContext };

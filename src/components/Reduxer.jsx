import PropTypes from 'prop-types';
import useSWR from 'swr';

const ReduxerContext = React.createContext({ data: {} });

const fetcher = (...args) => fetch(...args)
  .then((res) => res.json())
  .then((res) => {
    if (res.code !== 200) {
      throw new Error(res.result.message);
    }
    return res.result;
  });

const ReduxerProvider = ({ uri, children }) => {
  const {
    data,
    error,
    mutate: mutateLocally,
  } = useSWR(uri, fetcher, {
    revalidateOnFocus: false,
  });

  /**
   *
   * @param {() => {[id]: data}} handler
   * @param {['add', 'update']} type
   * list data contain one or more data with id
   */
  const mutate = (handler, type = 'add') => {
    mutateLocally(async (current) => {
      const response = await handler();
      let result = { ...response, ...current }; // push data to first if editing
      if (type === 'update') {
        result = { ...current, ...response }; // detect key and update w/o re-ordering
      }
      return result;
    }, false);
  };

  return (
    <ReduxerContext.Provider value={{
      data: data || {},
      mutate,
      error,
    }}
    >
      {children}
    </ReduxerContext.Provider>
  );
};

ReduxerProvider.propTypes = {
  children: PropTypes.node.isRequired,
  uri: PropTypes.string.isRequired,
};

export { ReduxerProvider, ReduxerContext };

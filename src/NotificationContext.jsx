import { createContext, useReducer } from 'react';

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'create':
      return `anecdote '${action.payload}' was create`;
    case 'vote':
      return `anecdote '${action.payload}' voted`;
    case 'disappear':
      return null;
    default:
      return state;
  }
};

export const NotificationProvider = (props) => {
  const [notificationContent, notificationDispatch] = useReducer(notificationReducer, '');

  return (
    <>
      <NotificationContext.Provider value={[notificationContent, notificationDispatch]}>
        {props.children}
      </NotificationContext.Provider>
    </>
  );
};

export default NotificationContext;

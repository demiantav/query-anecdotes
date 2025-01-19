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
    case 'error':
      return 'too short anecdote, must have length 5 or more';
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

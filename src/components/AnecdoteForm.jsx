import service from '../services/anecdoteService.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Notification from './Notification.jsx';
import NotificationContext from '../NotificationContext';
import { useContext } from 'react';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const [content, dispatch] = useContext(NotificationContext);

  const anecdoteMutation = useMutation({
    mutationFn: service.createNewAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    anecdoteMutation.mutate({
      content,
      votes: 0,
    });

    dispatch({ type: 'create', payload: content });

    setTimeout(() => {
      dispatch({ type: 'disappear' });
    }, 5000);

    event.target.anecdote.value = '';
    console.log('new anecdote');
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>

      <br></br>
    </div>
  );
};

export default AnecdoteForm;

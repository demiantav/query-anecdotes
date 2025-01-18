import service from '../services/anecdoteService.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Notification from './Notification.jsx';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
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

      <Notification />
    </div>
  );
};

export default AnecdoteForm;

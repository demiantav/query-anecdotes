import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import services from './services/anecdoteService.js';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const App = () => {
  const queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: services.getAllAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const voteMutation = useMutation({
    mutationFn: services.updateNewAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    },
  });

  if (isPending) {
    return <p>Loading data...</p>;
  }

  if (isError) {
    return <p>anecdote service not available due to problems in server</p>;
  }

  const anecdotes = data;
  console.log('App rendered');

  const handleVote = (anecdote) => {
    const anecdoteVoteUpdate = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    voteMutation.mutate(anecdoteVoteUpdate);
  };

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;

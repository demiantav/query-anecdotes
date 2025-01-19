import axios from 'axios';

const API_URI = 'http://localhost:3001/anecdotes';

const getAllAnecdotes = async () => {
  const anecdotes = await axios.get(API_URI);

  return anecdotes.data;
};

const createNewAnecdote = async (anecdote) => {
  try {
    const anecdoteToCreate = await axios.post(API_URI, anecdote);

    return anecdoteToCreate.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

const updateNewAnecdote = async (anecdote) => {
  try {
    const anecdoteToCreate = await axios.put(`${API_URI}/${anecdote.id}`, anecdote);

    return anecdoteToCreate.data;
  } catch (error) {
    console.log(error);

    return error;
  }
};

export default { getAllAnecdotes, createNewAnecdote, updateNewAnecdote };

import React from 'react';
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';



const fetchTodos = async () => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');
  return data;
};

const addTodo = async (newTodo) => {
  const { data } = await axios.post('https://jsonplaceholder.typicode.com/todos', newTodo);
  return data;
};

const TodoList = () => {
  const { data: todos, isLoading, error } = useQuery('todos', fetchTodos);
  const queryClient = useQueryClient();

  const mutation = useMutation(addTodo, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('todos');
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching todos</div>;

  const handleAddTodo = () => {
    const newTodo = { title: 'New Todo', completed: false };
    mutation.mutate(newTodo);
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} {todo.completed ? '(Completed)' : ''}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

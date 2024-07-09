import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from '../components/todo';
import { TextField, Button, Typography, Container } from '@mui/material';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  const fetchTodos = async () => {
    const response = await axios.get('/api/hello');
    setTodos(response.data.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (task) {
      await axios.post('/api/hello', { task });
      setTask('');
      fetchTodos();
    }
  };

  return (
    <Container className="py-10">
      <Typography variant="h4" className="text-center mb-4">
        Todo List
      </Typography>
      <div className="flex justify-center mb-4">
        <TextField
          label="New Task"
          variant="outlined"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="mr-2"
        />
        <Button variant="contained" color="primary" onClick={addTodo}>
          Add Todo
        </Button>
      </div>
      <TodoList todos={todos} fetchTodos={fetchTodos} />
    </Container>
  );
};

export default Home;

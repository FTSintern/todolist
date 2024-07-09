import React from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, IconButton, Checkbox } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const TodoList = ({ todos, fetchTodos }) => {
  const toggleComplete = async (id, completed) => {
    await axios.put('/api/hello', { id, completed: !completed });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete('/api/hello', { data: { id } });
    fetchTodos();
  };

  return (
    <List>
      {todos.map(todo => (
        <ListItem key={todo._id} className="flex justify-between items-center">
          <Checkbox
            checked={todo.completed}
            onChange={() => toggleComplete(todo._id, todo.completed)}
          />
          <ListItemText
            primary={todo.task}
            className={todo.completed ? 'line-through' : ''}
          />
          <IconButton edge="end" onClick={() => deleteTodo(todo._id)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default TodoList;

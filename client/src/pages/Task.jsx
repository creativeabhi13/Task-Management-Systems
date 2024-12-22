// Frontend - React with Material-UI
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [filter, setFilter] = useState('all');

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async () => {
    try {
      const response = await axios.post(
        '/api/tasks',
        { description, dueDate },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setTasks([...tasks, response.data]);
      setDescription('');
      setDueDate('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleFilterTasks = async () => {
    try {
      const response = await axios.get(`/api/tasks/filter?status=${filter}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error filtering tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant="h4" gutterBottom>Task Management</Typography>

        <Box display="flex" gap={2} marginBottom={2}>
          <TextField
            label="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
          <TextField
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <Button variant="contained" color="primary" onClick={handleAddTask}>
            Add Task
          </Button>
        </Box>

        <Box marginBottom={2}>
          <FormControl fullWidth>
            <InputLabel>Filter Tasks</InputLabel>
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              onBlur={handleFilterTasks}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="overdue">Overdue</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <List>
          {tasks.map((task) => (
            <ListItem
              key={task._id}
              secondaryAction={
                <IconButton edge="end" onClick={() => handleDeleteTask(task._id)}>
                  <DeleteIcon color="secondary" />
                </IconButton>
              }
            >
              <ListItemText
                primary={task.description}
                secondary={`Due: ${new Date(task.dueDate).toLocaleDateString()}`}
              />
            </ListItem>
          ))}
        </List>
        <Typography variant="body1" marginTop={2}>
          Total Tasks: {tasks.length}
        </Typography>
      </Container>
    </ThemeProvider>
  );
};

export default TaskPage;

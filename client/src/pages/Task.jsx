import React, { useState, useEffect } from 'react';
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
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { dataDelete, dataFetch, dataPost } from '../services/apiEndPoint';
import { useAuth } from '../context/AuthContext';

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
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false); // Modal state

  const { token } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await dataFetch('/task', token);
      if (response.status === 200) {
        setTasks(response.data);
      }
    } catch (error) {
      toast.error('Error fetching tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async () => {
    if (!description || !dueDate) {
      toast.warning('Task description and due date are required');
      return;
    }
  
    setLoading(true);
    try {
      const taskData = { description, dueDate };
      const token = localStorage.getItem('authToken'); // Get token from localStorage
  
      const response = await dataPost('/task', taskData, token); // Pass token correctly
  
      if (response.status === 201) {
        setTasks((prevTasks) => [...prevTasks, response.data]);
        setDescription('');
        setDueDate('');
        toast.success('Task added successfully');
        setOpenModal(false); // Close the modal after success
      } else {
        toast.error('Error adding task');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error adding task');
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    setLoading(true);
    try {
      await dataDelete(`/task/${id}`, token);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Error deleting task');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterTasks = async (event) => {
    setFilter(event.target.value);
    setLoading(true);
    try {
      const response = await dataFetch(`/task/filter?status=${event.target.value}`, token);
      if (response.status === 200 && response.data) {
        setTasks(response.data);
      }
    } catch (error) {
      toast.error('Error filtering tasks');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="top-right" autoClose={3000} />
      <Container>
        <Typography variant="h4" gutterBottom>
          Task Management
        </Typography>
        <Box display="flex" gap={2} marginBottom={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenModal(true)} // Open modal when clicked
            disabled={loading}
          >
            Add Task
          </Button>
        </Box>

        <Box marginBottom={2}>
          <FormControl fullWidth>
            <InputLabel>Filter Tasks</InputLabel>
            <Select value={filter} onChange={handleFilterTasks} disabled={loading}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="overdue">Overdue</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" marginTop={2}>
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {tasks?.map((task) => (
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
        )}

        <Typography variant="body1" marginTop={2}>
          Total Tasks: {tasks.length}
        </Typography>

        {/* Modal for adding a task */}
        <Dialog open={openModal} onClose={() => setOpenModal(false)}>
          <DialogTitle>Add Task</DialogTitle>
          <DialogContent>
            <TextField
              label="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Due Date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenModal(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleAddTask} color="primary">
              Add Task
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default TaskPage;

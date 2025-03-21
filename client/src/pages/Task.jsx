// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Container,
//   TextField,
//   Button,
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
//   Typography,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   Pagination,
//   ButtonBase,
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { dataDelete, dataFetch, dataPost, dataUpdate } from '../services/apiEndPoint';
// import { useAuth } from '../context/AuthContext';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976d2',
//     },
//     secondary: {
//       main: '#dc004e',
//     },
//   },
// });

// const TaskPage = () => {
//   const [tasks, setTasks] = useState([]);
//   const [description, setDescription] = useState('');
//   const [title,setTitle] = useState('' );
//   const [status,setStatus] = useState('');
//   // const [dueDate, setDueDate] = useState('');
//  // const [filter, setFilter] = useState('all');
//   const [loading, setLoading] = useState(false);
//   const [openModal, setOpenModal] = useState(false); // Modal state
//   const [openUpdateModal, setOpenUpdateModal] = useState(false); // Modal state
//   const [openStatusModal, setOpenStatusModal] = useState(false); // Modal state

//   const [title1,setTitle1] = useState('' );
//   const [status1,setStatus1] = useState('');
//   const [description1, setDescription1] = useState('');
//   const [status2,setStatus2] = useState('');

//   const { token } = useAuth();

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async (id) => {
//     setLoading(true);
//     try {
//       const response = await dataFetch(`/task/${id}`, token);
    
//       if (response.status === 200) {
//         setTasks(response?.data);
        
//       }
//     } catch (error) {
//       toast.error('Error fetching tasks');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddTask = async () => {
//     // if (!description || !dueDate) {
//     //   toast.warning('Task description and due date are required');
//     //   return;
//     // }

//     if(!description || !title || !status){
//       toast.warning('Task description, title and status are required');
//       return;
//     }
  
//     setLoading(true);
//     try {
//       const taskData = { description, title,status }; // Add title and status to taskData
//       const token = localStorage.getItem('authToken'); // Get token from localStorage
  
//       const response = await dataPost('/task', taskData, token); // Pass token correctly
  
//       if (response.status === 201) {
//         setTasks((prevTasks) => [...prevTasks, response.data]);
//         setDescription('');
//         setTitle('');
//         setStatus('');
//         toast.success('Task added successfully');
//         setOpenModal(false); // Close the modal after success
//       } else {
//         toast.error('Error adding task');
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.error || 'Error adding task');
//     } finally {
//       setLoading(false);
//     }
//   };
  
  

//   const handleDeleteTask = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this task?')) return;

//     setLoading(true);
//     try {
//       await dataDelete(`/task/${id}`, token);
//       setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
//       toast.success('Task deleted successfully');
//     } catch (error) {
//       toast.error('Error deleting task');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdateTask = async (id) =>{
//     setLoading(true);
//     try{
//       const taskData = {status2};
//       const response = await dataUpdate(`/task/${id}`,taskData,token);
//       if(response.status === 200){
//         setTasks((prevTasks) => prevTasks.map((task) => {
//           if (task._id === id) {
//             return response.data;
//           }
//           return task;
//         }));
//         toast.success('Task updated successfully');
//       } else {
//         toast.error('Error updating task');
//       }

//     } catch (error) {
//       toast.error('Error updating task');

//     }
//   }

//   const handleUpdateStatus = async (id) => {
//     setLoading(true);
//     try {
//       const response = await dataUpdate(`/updateStatus/${id}`, token);
//       if (response.status === 200) {
//         setTasks((prevTasks) => prevTasks.map((task) => {
//           if (task._id === id) {
//             return response.data;
//           }
//           return task;
//         }));
//         toast.success('Task status updated successfully');
//       } else {
//         toast.error('Error updating task status');
//       }
//     } catch (error) {
//       toast.error('Error updating task status');
//     } finally {
//       setLoading(false);
//       }
//   };  

//   // const handleFilterTasks = async (event) => {
//   //   setFilter(event.target.value);
//   //   setLoading(true);
//   //   try {
//   //     const response = await dataFetch(`/task/filter?status=${event.target.value}`, token);
//   //     if (response.status === 200 && response.data) {
//   //       setTasks(response.data);
//   //     }
//   //   } catch (error) {
//   //     toast.error('Error filtering tasks');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   return (
//     <ThemeProvider theme={theme}>
//       <ToastContainer position="top-right" autoClose={3000} />
//       <Container>
//         <Typography variant="h4" gutterBottom>
//           Task Management
//         </Typography>
//         <Box display="flex" gap={2} marginBottom={2}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => setOpenModal(true)} // Open modal when clicked
//             disabled={loading}
//           >
//             Add Task
//           </Button>
//         </Box>

//        {/* <Box marginBottom={2}>
//           <FormControl fullWidth>
//             <InputLabel>Filter Tasks</InputLabel>
//             <Select value={filter} onChange={handleFilterTasks} disabled={loading}>
//               <MenuItem value="all">All</MenuItem>
//               <MenuItem value="today">Today</MenuItem>
//               <MenuItem value="overdue">Overdue</MenuItem>
//             </Select>
//           </FormControl>
//         </Box> */}

//         {loading ? (
//           <Box display="flex" justifyContent="center" marginTop={2}>
//             <CircularProgress />
//           </Box>
//         ) : (
//           // <List>
//           //   {tasks?.map((task) => (
//           //     <ListItem
//           //       key={task._id}
//           //       secondaryAction={
//           //         <IconButton edge="end" onClick={() => handleDeleteTask(task._id)}>
//           //           <DeleteIcon color="secondary" />
//           //         </IconButton>
//           //       }


//           //     >
//           //       {/* <ListItemText
//           //         primary={task.description}
//           //         secondary={`Due: ${new Date(task.dueDate).toLocaleDateString()}`}
//           //       /> */}
//           //        <ListItemText
//           //         primary={task?.title?task?.title : "No Title"}
//           //         secondary={task?.description ? task?.description : "No Description"}
//           //       />
//           //      <Button onClick={() => handleUpdateStatus(task?._id)}>
//           //      {task?.status}
              
//           //       </Button>
                
                
//           //     </ListItem>
//           //   ))}
//           // </List>
//      <Table>
//       <TableHead>
//         <TableRow>
//           <TableCell>Title</TableCell>
//           <TableCell>Description</TableCell>
//           <TableCell>Status</TableCell>
//           <TableCell>Actions</TableCell>
//         </TableRow>
//       </TableHead>

//       {tasks.map((task) => (
//         <TableRow key={task?._id}>
//           <TableCell>{task?.title}</TableCell>
//           <TableCell>{task?.description}</TableCell>
//           <TableCell>{task?.status}</TableCell>
//           <TableCell>
//             <ButtonBase onClick={() => setOpenUpdateModal(true)} sx={{  
//                    textAlign: "center",
//                    display: "flex",
//                    backgroundColor: "black",
//                    color: "white",borderRadius: "5px",padding: "5px",margin: "5px",  }}>
              
//               Update
//             </ButtonBase >
//             <ButtonBase onClick={() => handleDeleteTask(task?._id)} sx={{  
//                    textAlign: "center",
//                    display: "flex",
//                    backgroundColor: "black",
//                    color: "white",borderRadius: "5px",padding: "5px",margin: "5px",  }}>
//               Delete
//             </ButtonBase>
//             <ButtonBase onClick={() => setOpenStatusModal(true)} sx={{  
//                    textAlign: "center",
//                    display: "flex",
//                    backgroundColor: "black",
//                    color: "white",borderRadius: "5px",padding: "5px",margin: "5px",  }}>
//               Update Status
//             </ButtonBase>
//           </TableCell>
//         </TableRow>
//       ))}
//      </Table>
          
//         )}

//         <Typography variant="body1" marginTop={2}>
//           Total Tasks: {tasks.length}
//         </Typography>

//         {/* Modal for adding a task */}
//         <Dialog open={openModal} onClose={() => setOpenModal(false)}>
//           <DialogTitle>Add Task</DialogTitle>
//           <DialogContent>
//             <TextField
//               label="Task Title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               fullWidth
//               margin="normal"
//             />
//             <TextField
//               label="Task Description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               fullWidth
//               margin="normal"
              
//             />
//             <TextField 
//             select
//               label="Status"
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               fullWidth
//               margin="normal"
//             >
//               <MenuItem value="pending">Pending</MenuItem>
//               <MenuItem value="completed">Completed</MenuItem>
//               <MenuItem value="inprogress">In Progress</MenuItem>
//             </TextField>

//             {/* <TextField
//               label="Due Date"
//               type="date"
//               value={dueDate}
//               onChange={(e) => setDueDate(e.target.value)}
//               fullWidth
//               margin="normal"
//               InputLabelProps={{ shrink: true }}
//             /> */}

//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenModal(false)} color="secondary">
//               Cancel
//             </Button>
//             <Button onClick={handleAddTask} color="primary">
//               Add Task
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Modal for Updating task  */}
//         <Dialog open={openUpdateModal} onClose={() => setOpenUpdateModal(false)}>
//           <DialogTitle>Update Task</DialogTitle>
//           <DialogContent>
//             <TextField
//               label="Task Title"
//               value={title1}
//               onChange={(e) => setTitle1(e.target.value)}
//               fullWidth
//               margin="normal"
//             />
//             <TextField
//               label="Task Description"
//               value={description1}
//               onChange={(e) => setDescription1(e.target.value)}
//               fullWidth
//               margin="normal"
              
//             />
//             <TextField 
//             select
//               label="Status"
//               value={status1}
//               onChange={(e) => setStatus1(e.target.value)}
//               fullWidth
//               margin="normal"
//             >
//               <MenuItem value="pending">Pending</MenuItem>
//               <MenuItem value="completed">Completed</MenuItem>
//               <MenuItem value="inprogress">In Progress</MenuItem>
//             </TextField>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenUpdateModal(false)} color="secondary">
//               Cancel
//             </Button>
//             <Button onClick={handleUpdateTask} color="primary">
//               Update Task
//             </Button>
//           </DialogActions>
//         </Dialog>


// {/* Modal for only update Status  */}

// <Dialog open={openStatusModal} onClose={() => setOpenStatusModal(false)}>
//           <DialogTitle>Update Task Status</DialogTitle>
//           <DialogContent>
           
//             <TextField
//             select
//               label="Status"
//               value={status2}
//               onChange={(e) => setStatus2(e.target.value)}
//               fullWidth
//               margin="normal"
//             >
//               <MenuItem value="pending">Pending</MenuItem>
//               <MenuItem value="completed">Completed</MenuItem>
//               <MenuItem value="inprogress">In Progress</MenuItem>
//             </TextField>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenStatusModal(false)} color="secondary">
//               Cancel
//             </Button>
//             <Button onClick={handleUpdateStatus} color="primary">
//               Update Task
//             </Button>
//           </DialogActions>
// </Dialog>
//         {/* Pagination */}
       
        
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default TaskPage;



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
  Table,
  TableHead,
  TableRow,
  TableCell,
  ButtonBase,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { dataDelete, dataFetch, dataPost, dataUpdate } from '../services/apiEndPoint';
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
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false); // Modal state
  const [openUpdateModal, setOpenUpdateModal] = useState(false); // Modal state for updating task details
  const [openStatusModal, setOpenStatusModal] = useState(false); // Modal state for updating task status

  const [taskToUpdate, setTaskToUpdate] = useState(null); // To store the task that will be updated
  const [statusToUpdate, setStatusToUpdate] = useState(''); // For status update

  const { token,userData } = useAuth();
console.log(userData);
  useEffect(() => {
    fetchTasks();
  }, []);

  // const fetchTasks = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await dataFetch(`/task`, token);  // Adjusted to fetch all tasks
  //     if (response.status === 200) {
  //       setTasks(response?.data);
  //     }
  //   } catch (error) {
  //     toast.error('Error fetching tasks');
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await dataFetch(`/task/${userData._id}`, token);  // Fetch tasks for the logged-in user
      if (response.status === 200) {
        setTasks(response?.data);
      }
    } catch (error) {
      toast.error('Error fetching tasks');
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddTask = async () => {
    if (!description || !title || !status) {
      toast.warning('Task description, title, and status are required');
      return;
    }

    setLoading(true);
    try {
      const taskData = { description, title, status };
      const response = await dataPost('/task', taskData, token);

      if (response.status === 201) {
        setTasks((prevTasks) => [...prevTasks, response.data]);
        setDescription('');
        setTitle('');
        setStatus('');
        toast.success('Task added successfully');
        setOpenModal(false); // Close the modal after success
      } else {
        toast.error('Error adding task');
      }
    } catch (error) {
      toast.error('Error adding task');
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

  const handleUpdateTaskDetails = async () => {
    if (!taskToUpdate || !taskToUpdate.title || !taskToUpdate.description || !taskToUpdate.status) {
      toast.warning('Task title, description, and status are required');
      return;
    }

    setLoading(true);
    try {
      const response = await dataUpdate(`/task/${taskToUpdate._id}`, taskToUpdate, token);
      if (response.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === taskToUpdate._id ? response.data : task))
        );
        toast.success('Task updated successfully');
        setOpenUpdateModal(false); // Close the modal after success
      } else {
        toast.error('Error updating task');
      }
    } catch (error) {
      toast.error('Error updating task');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!statusToUpdate) {
      toast.warning('Status is required');
      return;
    }

    setLoading(true);
    try {
      const response = await dataUpdate(`/task/updateStatus/${taskToUpdate._id}`, { status: statusToUpdate }, token);
      if (response.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === taskToUpdate._id ? response.data : task))
        );
        toast.success('Task status updated successfully');
        setOpenStatusModal(false); // Close the modal after success
      } else {
        toast.error('Error updating task status');
      }
    } catch (error) {
      toast.error('Error updating task status');
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
            onClick={() => setOpenModal(true)}
            disabled={loading}
          >
            Add Task
          </Button>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" marginTop={2}>
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            {tasks.map((task) => (
              <TableRow key={task?._id}>
                <TableCell>{task?.title}</TableCell>
                <TableCell>{task?.description}</TableCell>
                <TableCell>{task?.status}</TableCell>
                <TableCell>
                  <ButtonBase
                    onClick={() => {
                      setTaskToUpdate(task);
                      setOpenUpdateModal(true);
                    }}
                    sx={{
                      textAlign: 'center',
                      display: 'flex',
                      backgroundColor: 'black',
                      color: 'white',
                      borderRadius: '5px',
                      padding: '5px',
                      margin: '5px',
                    }}
                  >
                    Update
                  </ButtonBase>
                  <ButtonBase
                    onClick={() => handleDeleteTask(task?._id)}
                    sx={{
                      textAlign: 'center',
                      display: 'flex',
                      backgroundColor: 'black',
                      color: 'white',
                      borderRadius: '5px',
                      padding: '5px',
                      margin: '5px',
                    }}
                  >
                    Delete
                  </ButtonBase>
                  <ButtonBase
                    onClick={() => {
                      setTaskToUpdate(task);
                      setOpenStatusModal(true);
                    }}
                    sx={{
                      textAlign: 'center',
                      display: 'flex',
                      backgroundColor: 'black',
                      color: 'white',
                      borderRadius: '5px',
                      padding: '5px',
                      margin: '5px',
                    }}
                  >
                    Update Status
                  </ButtonBase>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        )}

        <Typography variant="body1" marginTop={2}>
          Total Tasks: {tasks.length}
        </Typography>

        {/* Modal for adding a task */}
        <Dialog open={openModal} onClose={() => setOpenModal(false)}>
          <DialogTitle>Add Task</DialogTitle>
          <DialogContent>
            <TextField
              label="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              select
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              fullWidth
              margin="normal"
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="inprogress">In Progress</MenuItem>
            </TextField>
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

        {/* Modal for Updating task details */}
        <Dialog open={openUpdateModal} onClose={() => setOpenUpdateModal(false)}>
          <DialogTitle>Update Task</DialogTitle>
          <DialogContent>
            <TextField
              label="Task Title"
              value={taskToUpdate?.title || ''}
              onChange={(e) => setTaskToUpdate({ ...taskToUpdate, title: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Task Description"
              value={taskToUpdate?.description || ''}
              onChange={(e) => setTaskToUpdate({ ...taskToUpdate, description: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              select
              label="Status"
              value={taskToUpdate?.status || ''}
              onChange={(e) => setTaskToUpdate({ ...taskToUpdate, status: e.target.value })}
              fullWidth
              margin="normal"
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="inprogress">In Progress</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenUpdateModal(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleUpdateTaskDetails} color="primary">
              Update Task
            </Button>
          </DialogActions>
        </Dialog>

        {/* Modal for Updating Task Status */}
        <Dialog open={openStatusModal} onClose={() => setOpenStatusModal(false)}>
          <DialogTitle>Update Task Status</DialogTitle>
          <DialogContent>
            <TextField
              select
              label="Status"
              value={statusToUpdate}
              onChange={(e) => setStatusToUpdate(e.target.value)}
              fullWidth
              margin="normal"
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="inprogress">In Progress</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenStatusModal(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleUpdateStatus} color="primary">
              Update Status
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default TaskPage;


// import Task from '../models/Task.js';

// export const createTask = async (req, res) => {
//   try {
//     const { description, dueDate } = req.body;

//     // Check if userId is set
//     const userId = req.userId;
//     if (!userId) {
//       return res.status(400).json({ error: 'User ID is required.' });
//     }

//     // Create and save the task
//     const task = new Task({
//       description,
//       dueDate,
//       userId,
//     });

//     await task.save();

//     res.status(201).json(task);
//   } catch (error) {
//     console.error('Error creating task:', error);
//     res.status(400).json({ error: error.message });
//   }
// };




// export const getTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find({ userId: req.userId });
//     res.json(tasks);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// export const updateTask = async (req, res) => {
//   try {
//     const { description, dueDate } = req.body;
//     const task = await Task.findOneAndUpdate(
//       { _id: req.params.id, userId: req.userId },
//       { description, dueDate },
//       { new: true }
//     );
//     if (!task) return res.status(404).json({ error: 'Task not found' });
//     res.json(task);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// export const deleteTask = async (req, res) => {
//   try {
//     const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
//     if (!task) return res.status(404).json({ error: 'Task not found' });
//     res.json({ message: 'Task deleted successfully' });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// export const filterTasks = async (req, res) => {
//   try {
//     const { status } = req.query;
//     const today = new Date();
//     const tasks = await Task.find({
//       userId: req.userId,
//       ...(status === 'today' && {
//         dueDate: {
//           $gte: today.setHours(0, 0, 0, 0),
//           $lte: today.setHours(23, 59, 59, 999),
//         },
//       }),
//       ...(status === 'overdue' && { dueDate: { $lt: new Date() } }),
//     });
//     res.json(tasks);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
import Task from "../models/Task.js";

// Create Task
export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // User ID is required (from auth middleware)
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const task = new Task({
      title,
      description,
      status,
      userId, // Ensure to assign userId here
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(400).json({ error: error.message });
  }
};

// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req._id });
    res.json(tasks).status(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



export const getTask = async (req, res) => {
  try {
    // Fetch the task by task ID and user ID
    const task = await Task.findOne({ _id: req.params.id, userId: req._id });
    console.log(task);

    // If no task is found, return a 404 error
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Return the task with a 200 status code
    res.status(200).json(task);
  } catch (error) {
    // Catch any errors and return a 400 status with the error message
    res.status(400).json({ error: error.message });
  }
};


// Update Task
export const updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req._id },
      { title, description, status },
      { new: true }
    );
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task).status(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req._id });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" }).status(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update task status
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req._id },
      { status },
      { new: true }
    );
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task).status(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

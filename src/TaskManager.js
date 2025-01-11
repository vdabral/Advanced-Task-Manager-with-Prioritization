import React, { useState } from 'react';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskPriority, setTaskPriority] = useState('High');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterCompletion, setFilterCompletion] = useState('All');

  // Function to handle adding tasks
  const addTask = () => {
    if (taskTitle.trim() === '') {
      alert('Task title cannot be empty');
      return;
    }
    const newTask = {
      id: Date.now(),
      title: taskTitle,
      priority: taskPriority,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTaskTitle('');
    setTaskPriority('High'); // Reset to High priority after adding
  };

  // Function to toggle task completion
  const toggleCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Function to delete a task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  // Function to handle filter change for priority
  const handlePriorityFilterChange = (e) => {
    setFilterPriority(e.target.value);
  };

  // Function to handle filter change for completion status
  const handleCompletionFilterChange = (e) => {
    setFilterCompletion(e.target.value);
  };

  // Function to filter tasks based on selected filters
  const getFilteredTasks = () => {
    return tasks
      .filter((task) => {
        if (filterPriority !== 'All' && task.priority !== filterPriority) {
          return false;
        }
        if (
          filterCompletion === 'Completed' &&
          !task.completed
        ) {
          return false;
        }
        if (
          filterCompletion === 'Incomplete' &&
          task.completed
        ) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        const priorityOrder = ['High', 'Medium', 'Low'];
        return priorityOrder.indexOf(b.priority) - priorityOrder.indexOf(a.priority);
      });
  };

  return (
    <div>
      <h1>Advanced Task Manager</h1>

      {/* Task input */}
      <div>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Enter task title"
        />
        <select
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Filter controls */}
      <div>
        <label>
          Priority:
          <select
            value={filterPriority}
            onChange={handlePriorityFilterChange}
          >
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>
        <label>
          Completion Status:
          <select
            value={filterCompletion}
            onChange={handleCompletionFilterChange}
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Incomplete">Incomplete</option>
          </select>
        </label>
      </div>

      {/* Task List */}
      <ul>
        {getFilteredTasks().map((task) => (
          <li key={task.id} style={{ marginBottom: '10px' }}>
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                fontWeight: task.priority === 'High' ? 'bold' : 'normal',
                color: task.priority === 'High' ? 'red' : 'black',
              }}
            >
              {task.title} - {task.priority}
            </span>
            <button onClick={() => toggleCompletion(task.id)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;

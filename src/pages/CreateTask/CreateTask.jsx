import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CreateTask = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    desc: "",
    status: "",
    dueDate: "",
  });
  const [taskId, setTaskId] = useState(null); // Track task ID for update/delete actions

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Create a new task
  const handleCreateTask = async () => {
    try {
      const jsonWebToken = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/create-task`,
        task,
        {
          headers: { Authorization: `Bearer ${jsonWebToken}` },
        }
      );
      setTaskId(response.data._id); // Assuming the task ID is returned in the response
      // console.log("Task created successfully:", response.data);
      // alert("Task created successfully!");
      navigate("/tasks");
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        width: "400px",
        margin: "auto",
        mt: "100px",
        mb: "50px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h5" gutterBottom>
        {taskId ? "Update Task" : "Create Task"}
      </Typography>

      <TextField
        label="Title"
        name="title"
        value={task.title}
        onChange={handleInputChange}
        multiline
        rows={2}
        variant="outlined"
        fullWidth
      />

      <TextField
        label="Description"
        name="desc"
        value={task.desc}
        onChange={handleInputChange}
        multiline
        rows={4}
        variant="outlined"
        fullWidth
      />

      <TextField
        label="Status"
        name="status"
        value={task.status}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
      />

      <TextField
        label="Due Date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleInputChange}
        type="date"
        variant="outlined"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />

      {/* Buttons for creating, updating, and deleting the task */}
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleCreateTask}>
          {taskId ? "Create New Task" : "Create Task"}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateTask;

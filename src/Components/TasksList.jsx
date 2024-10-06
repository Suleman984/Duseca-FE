import { React, useState } from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Header from "./Header";
import axios from "axios";
const TasksList = ({ tasks }) => {
  const handleDelete = async (taskId) => {
    console.log("handle delete triggered");

    try {
      const jsonWebToken = localStorage.getItem("token");
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/delete-task/${taskId}`,
        {
          headers: { Authorization: `Bearer ${jsonWebToken}` },
        }
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // console.log("Task in tasklist", tasks);
  return (
    <>
      <Header />
      {/* {console.log("task in taskList", tasks)} */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Grid container spacing={2}>
          {tasks.map((task, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="div">
                    {task.title}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    {task.description}
                  </Typography>
                  <Typography color="text.secondary">
                    Status: {task.status}
                  </Typography>
                  <Typography color="text.secondary">
                    Due Date: {new Date(task.dueDate).toLocaleDateString()}
                  </Typography>

                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {}}
                      sx={{ marginRight: 1 }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        handleDelete(task._id);
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default TasksList;

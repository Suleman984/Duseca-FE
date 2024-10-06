import { Button, Typography } from "@mui/material";
import { Card, CardContent } from "@mui/material";
import { useState } from "react";
import { Box } from "@mui/material";
import axios from "axios";
export default function TaskDetails() {
  const task = {
    id: 1,
    title: "Complete the frontend design",
    description: "Finish designing the UI using Material-UI",
    status: "Pending",
    dueDate: "2024-10-10",
  };

  return (
    <>
      <Box sx={{ ml: "5%", mt: "5%" }}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Task Details
        </Typography>
        <Box>
          <Card variant="">
            <CardContent>
              <Typography variant="h5" component="div">
                {task.title}
              </Typography>
              <Typography color="text.secondary">
                Due Date: {new Date(task.dueDate).toLocaleDateString()}
              </Typography>
              <Typography color="text.secondary">
                Status: {task.status}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {task.description}
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
                <Button variant="outlined" color="error" onClick={() => {}}>
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
}

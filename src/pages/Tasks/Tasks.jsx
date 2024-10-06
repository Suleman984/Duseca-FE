import { Typography, Box } from "@mui/material";
import axios from "axios";
import TasksList from "../../Components/TasksList";
import { useEffect, useContext } from "react";

import { AuthContext, TasksContext } from "../../App";
import { useLocation } from "react-router-dom";
const Tasks = () => {
  const { user, setUser } = useContext(AuthContext);
  const { tasks, setTasks } = useContext(TasksContext);
  const location = useLocation();
  const { userId } = location.state || {};
  const fetchTasks = async () => {
    try {
      console.log("User id:", userId);
      const jsonWebToken = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/user-tasks`,
        {
          headers: { Authorization: `Bearer ${jsonWebToken}` },
          params: {
            userId: userId ?? user._id,
          },
        }
      );
      console.log("Tasks: ", response);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    console.log("useEffect", tasks);
    fetchTasks();
  }, []);
  console.log("tasks length : ", tasks.length);
  return (
    <Box sx={{ mt: "100px", ml: "50px" }}>
      <Typography variant="h4">All Tasks</Typography>

      {tasks?.length > 0 ? (
        <TasksList tasks={tasks} />
      ) : (
        <Typography>No task to show</Typography>
      )}
    </Box>
  );
};

export default Tasks;

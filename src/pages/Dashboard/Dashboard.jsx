import React, { useEffect, useState, useContext, createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Button } from "@mui/material";
import EmployeeList from "../../Components/EmployeeList";
import TasksList from "../../Components/TasksList";
import Header from "../../Components/Header";
import { AuthContext, TasksContext } from "../../App";

export default function Dashboard() {
  const location = useLocation();
  const [employees, setEmployees] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");
  const { user, setUser } = useContext(AuthContext);
  const { tasks, setTasks } = useContext(TasksContext);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const jsonWebToken = localStorage.getItem("token");

      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/users`,
        {
          headers: { Authorization: `Bearer ${jsonWebToken}` },
        }
      );

      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const jsonWebToken = localStorage.getItem("token");

      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/user-tasks/`,
        {
          headers: { Authorization: `Bearer ${jsonWebToken}` },
          params: { userId: user._id },
        }
      );

      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    console.log("User in dashboard ", user);
    if (user.role == "manager" || user.role == "Admin") {
      fetchEmployees();
    }
    if (user.role !== "Admin") {
      fetchTasks();
    }
  }, [user]);

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      <Header />
      <Box sx={{ display: "flex", mt: "100px" }}>
        <Box sx={{ flexGrow: 1, p: 1, mt: "0px", ml: "50px" }}>
          {(user.role == "Admin" || user.role == "manager") && (
            <Box>
              {user.role === "Admin" && (
                <Button
                  sx={{ mb: "20px" }}
                  onClick={() => navigate("/create-user")}
                >
                  Create User
                </Button>
              )}
              <EmployeeList employees={employees} />
            </Box>
          )}
          <Box sx={{ mt: "50px" }}>
            {user.role !== "Admin" && (
              <Button onClick={() => navigate("/create-task")}>
                Create Task
              </Button>
            )}

            {tasks?.length > 0 && user.role !== "Admin" && (
              <TasksList tasks={tasks} />
            )}
          </Box>

          <Button onClick={() => navigate("/tasks")}>View All Tasks</Button>
          {}
          {errorMessage && (
            <Typography color="error">{errorMessage}</Typography>
          )}
        </Box>
      </Box>
    </TasksContext.Provider>
  );
}

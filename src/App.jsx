import React, { createContext, useState } from "react";
import "./App.css"; // Make sure this contains the relevant styles
import LoginPage from "./pages/Auth/login"; // Import your LoginPage component
import Header from "./Components/Header"; // Import your Header component
import Dashboard from "./pages/Dashboard/Dashboard"; // Import your Dashboard component
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  redirect,
} from "react-router-dom";
import zIndex from "@mui/material/styles/zIndex";
import CreateTask from "./pages/CreateTask/CreateTask";
import TasksList from "./Components/TasksList";
import TaskDetails from "./pages/TaskDetails/TaskDetails";
import Tasks from "./pages/Tasks/Tasks";
import AddEmployee from "./pages/AddEmployee/AddEmployee";

export const AuthContext = createContext(null);
export const TasksContext = createContext(null);

function App() {
  const [user, setUser] = useState();
  const [tasks, setTasks] = useState([]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <TasksContext.Provider value={{ tasks, setTasks }}>
        <Router>
          <Header style={{ zIndex: 1 }} />{" "}
          {/* Header is placed directly at the top */}
          {/* Adjust this according to your Header height */}
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/dashboard" /> : <LoginPage />}
            />
            <Route
              path="/dashboard"
              element={<Dashboard style={{ zIndex: -1 }} />}
            />

            <Route
              path="/create-task"
              element={<CreateTask style={{ zIndex: -1 }} />}
            />

            <Route
              path="/create-user"
              element={<AddEmployee style={{ zIndex: -1 }} />}
            />

            <Route path="/tasks" element={<Tasks style={{ zIndex: -1 }} />} />
            <Route
              path="/tasks/:id"
              element={<TaskDetails style={{ zIndex: -1 }} />}
            />
          </Routes>
        </Router>
      </TasksContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;

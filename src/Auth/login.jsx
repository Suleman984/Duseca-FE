import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios"; // Import axios for making API requests
import { useNavigate } from "react-router-dom"; // Optional: if you want to redirect after login
import Dashboard from "../Dashboard/Dashboard";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // To show error messages
  const navigate = useNavigate(); // Optional: for navigation after successful login

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Send POST request to backend with email and password
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/login`,
        {
          email,
          password,
        }
      );

      // Store the token in localStorage on successful login
      const token = response.data.token;
      const role = response.data.userDetail.role;

      // Determine accessible routes based on user role
      let accessibleRoutes;
      let adminAccess = [""];
      switch (role) {
        case "Admin":
          accessibleRoutes = ["Manager", "User"];
          adminAccess = ["Add Employee"];
          break;
        case "manager":
          accessibleRoutes = ["Manage Users", "Manage tasks"];
          break;
        case "user":
          accessibleRoutes = ["Create Task", "View Tasks"];
          break;
        default:
          accessibleRoutes = [];
      }

      localStorage.setItem("token", token);

      // Clear the form fields by resetting state
      // setEmail("");
      // setPassword("");

      // Redirect user after successful login
      navigate("/dashboard", {
        state: { accessibleRoutes, adminAccess, role },
      }); // Pass accessibleRoutes in state
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Invalid email or password"); // Display error message
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "background.paper",
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Login
        </Typography>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update state on input change
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update state on input change
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;

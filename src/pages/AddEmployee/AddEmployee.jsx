import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
const AddEmployee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: "",
    email: "",
    password: "",
    role: "",
    manager: "", // Add manager field to formData
  });
  const [errorMessage, setErrorMessage] = useState(""); // To show error messages
  const [successMessage, setSuccessMessage] = useState(""); // To show success messages
  const [managers, setManagers] = useState([]); // Store the list of managers
  const [isManagerDropdownEnabled, setIsManagerDropdownEnabled] =
    useState(false); // Control the dropdown enable/disable state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Enable the manager dropdown only if role is "user"
    if (name === "role" && value === "user") {
      setIsManagerDropdownEnabled(true);
    } else if (name === "role" && value !== "user") {
      setIsManagerDropdownEnabled(false);
      setFormData((prevFormData) => ({
        ...prevFormData,
        manager: "", // Clear manager field if role is not user
      }));
    }
  };

  // Fetch managers from the backend when the component mounts
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const jsonWebToken = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/users?role=managers`,
          {
            headers: { Authorization: `Bearer ${jsonWebToken}` },
          }
        );
        setManagers(response.data); // Set the fetched managers
      } catch (error) {
        console.error("Error fetching managers:", error);
      }
    };

    fetchManagers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const jsonWebToken = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/create-user`,
        formData,
        {
          headers: { Authorization: `Bearer ${jsonWebToken}` },
        }
      );
      setSuccessMessage("User created successfully!");
      navigate("/dashboard");
      setErrorMessage("");
    } catch (error) {
      console.error("Error creating user:", error);
      setErrorMessage(
        "There was an error creating the user. Please try again."
      );
      setSuccessMessage("");
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
          Add Employee
        </Typography>

        {/* Display success or error messages */}
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        {successMessage && (
          <Typography color="primary">{successMessage}</Typography>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Full Name"
            name="fname"
            value={formData.fname}
            onChange={handleInputChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            type="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            type="password"
          />

          {/* Dropdown for role selection */}
          <TextField
            margin="normal"
            select
            required
            fullWidth
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
          >
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </TextField>

          {/* Dropdown for assigning manager, enabled only if role is "user" */}
          <TextField
            margin="normal"
            select
            fullWidth
            label="Assign Manager"
            name="manager"
            value={formData.manager}
            onChange={handleInputChange}
            disabled={!isManagerDropdownEnabled} // Disable if not enabled
          >
            {managers.map((manager) => (
              <MenuItem key={manager._id} value={manager._id}>
                {manager.fname}
              </MenuItem>
            ))}
          </TextField>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddEmployee;

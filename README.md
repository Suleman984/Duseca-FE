******\*******Frontend for User Management System**\*\***
This is the frontend part of a User Management System, built with React and Material UI, featuring different accessibility levels for Admins, Managers, and Users. The system includes authentication and role-based access control, allowing users to perform specific tasks based on their assigned roles.

Table of Contents
Features
Technology Stack
Installation
Directory Structure
Functionality
Admin Functionality
Manager Functionality
User Functionality
Routing
State Management

\***\*\*\*\*\***Features\***\*\*\*\*\***

Login Authentication: Users can log in using their email and password, which are authenticated via the backend.
Role-Based Dashboard: Once authenticated, users are directed to the dashboard, which provides different features based on their role (Admin, Manager, User).
Material UI: Used for styling and creating responsive, modern UI components.
Context API: Implemented for state management across components and pages.
React Router V6: Utilized for routing and navigation.

Technology Stack
React.js: For building the user interface.
Material UI: For UI components and design.
Context API: For state management.
React Router V6: For handling routing and navigation between different pages.
Axios: For making API requests (authentication and data fetching).

****\*\*****Installation****\*\*\*\*****
Clone the repository:
git clone https://github.com/Suleman984/Duseca-FE.git

**\*\*\***Install the required dependencies
npm install

\***\*\*\*\*\***Create an .env file in the root directory and add your backend API UR
REACT_APP_API_BASE_URL= PRIVATEKEY@JWT

\***\*\*\*\*\*\*\***Start Development Server
npm start

\***\*\*\*\*\*\*\***Directory Structure
src/
│
├── Auth/
│ └── Login.js # Login component
│
├── Components/ # Reusable components
│ ├── Header.js # Header component
│ ├── Sidebar.js # Sidebar navigation
│ └── TaskComponent.js # Task display component
│
├── Pages/
│ ├── AddEmployee.js # Page for adding a new employee (Admin)
│ ├── Auth.js # Authentication page
│ ├── CreateTask.js # Task creation page (User)
│ ├── Dashboard.js # Dashboard with role-based functionality
│ └── TaskDetails.js # Task details page
│
├── Context/ # Context API for state management
│ └── AuthContext.js # Authentication context and provider
│
└── App.js # Main application entry point and routing

****\*\*\*\*****Functionality******\*\*\*\*******

Admin Functionality
Create Employee: Admin can add new employees to the system.
View All Users: Admin can view a list of all registered users.
View All Tasks: Admin can view tasks assigned to all users.
Delete User Task: Admin has the ability to delete tasks created by any user.

Manager Functionality
View Assigned Users: Manager can view all users assigned under them.
View Tasks: Manager can see tasks created by assigned users.
Delete Task: Manager can delete tasks created by their assigned users.

User Functionality
Create Task: User can create their own tasks.
View Tasks: User can view all tasks created by them.
Delete Task: User can delete their own tasks.

********\*\*\*\*********Routing************\*************
The project uses React Router V6 to handle navigation. Below are the routes defined in the project:

Route Component Description
/login Login User login page
/dashboard Dashboard Role-based dashboard after login
/add-employee AddEmployee Add a new employee (Admin only)
/create-task CreateTask Create a task (User only)
/task-details/:id TaskDetails View detailed task information
State Management
State management across the application is handled using Context API. The AuthContext provides authentication status and role-based access control to the rest of the application.

AuthContext.js: Provides and manages the authentication state and user role across the app. It stores the authentication token and user role, which are used to display the appropriate dashboard and features for each user.

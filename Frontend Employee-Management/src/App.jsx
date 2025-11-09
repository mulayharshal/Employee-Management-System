import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import AdminRegister from "./Pages/AdminRegister";
import Home from "./Pages/Home";
import SidebarLayout from "./layouts/SidebarLayout";
import Dashboard from "./Pages/Dashboard";
import AdminProfile from "./Pages/AdminProfile";
import Login from "./Pages/Login";
import AddEmployee from "./Pages/AddEmployee";
import EmployeeList from "./Pages/EmployeeList";
import Settings from "./Pages/Settings";
import UpdateEmployee from "./Pages/UpdateEmployee";

function App() {
  return (

    <Routes>
      {/*  Full-page routes (no sidebar) */}
      <Route path="/"  element={<Navigate to="/signup" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home/>}/>
      <Route path="/signup" element={<AdminRegister />} />

      {/*  Routes with sidebar layout */}
      <Route element={<SidebarLayout />}>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /> </ProtectedRoute>} />
        <Route path="/adminProfile" element={<ProtectedRoute><AdminProfile /> </ProtectedRoute> } />
        <Route path="/addEmployee" element={<ProtectedRoute><AddEmployee/></ProtectedRoute>}/>
        <Route path="/viewEmployee" element={<ProtectedRoute><EmployeeList/></ProtectedRoute>}/>
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/update-employee/:empId" element={<ProtectedRoute><UpdateEmployee /></ProtectedRoute>} />

      </Route>
    </Routes>
  );
}

export default App;

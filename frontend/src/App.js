import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Editor from "./pages/Editor";
import Documents from "./pages/Documents";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Navbar from "./components/Navbar";

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  // const token = localStorage.getItem("token");
  // return token ? element : <Navigate to="/" replace />;
  if (localStorage.getItem("token")) {
    return (
      <>
        <Navbar />
        {element}
      </>
    );
  } else {
    return <Navigate to="/" replace />;
  }
};

// Auth Context Provider
const AuthRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return !token ? element : <Navigate to="/documents" replace />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthRoute element={<Login />} />} />
        <Route path="/register" element={<AuthRoute element={<Registration />} />} />
        <Route path="/documents" element={<ProtectedRoute element={<Documents />} />} />
        <Route path="/editor/:id" element={<ProtectedRoute element={<Editor />} />} />
      </Routes>
    </Router>
  );
};

export default App;

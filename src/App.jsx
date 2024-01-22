import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from './pages/Login'
import Dashboard from './pages/Dashboard';

function App() {

  return (
    <>
      <Router>
        <Routes>
        <Route
          exact
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
          exact
          path="/"
          element={<Login />}
        />
        <Route
            path="*"
            element={<Navigate to="/" />}
        />
        </Routes>
      </Router>
    </>
  )
}

export default App

import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./router/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Parser from "./pages/Parser";
import Ingredients from "./pages/Ingredients";
import ACV from "./pages/ACV";
import Scoring from "./pages/Scoring";

export default function App() {
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Routes protégées */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/parser" element={<Parser />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/acv" element={<ACV />} />
        <Route path="/scoring" element={<Scoring />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

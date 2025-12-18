import { useState } from "react";
import { Button, TextField, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { mockSignup } from "../api/mockAuth";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = () => {
    try {
      const res = mockSignup({ username, email, password });
      setUser(res.user);          // 🔴 indispensable
      navigate("/dashboard");     // 🔴 indispensable
    } catch (e) {
      alert(e.message || "Signup failed");
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 10 }}>
      <Typography variant="h5" mb={2}>
        Signup
      </Typography>

      <TextField
        fullWidth
        label="Username"
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <TextField
        fullWidth
        label="Email"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleSubmit}
      >
        Signup
      </Button>
    </Paper>
  );
}

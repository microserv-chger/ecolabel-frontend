import { useState } from "react";
import { Button, TextField, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { mockLogin } from "../api/mockAuth";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = () => {
    try {
      const res = mockLogin({ username, password });
      setUser(res.user);
      navigate("/dashboard");
    } catch (e) {
      alert("Login failed");
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 10 }}>
      <Typography variant="h5" mb={2}>
        Login
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
        Login
      </Button>
    </Paper>
  );
}

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Box, Button, TextField, Typography } from "@mui/material";
import leaf from "../assets/1.webp";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await signup({ username, email, password });
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err);
      // Try to get specific message from backend (e.g. "Username is already taken")
      const backendMsg = err.response?.data?.message || err.response?.data || "Signup failed. Try a different username or email.";
      setError(typeof backendMsg === 'string' ? backendMsg : JSON.stringify(backendMsg));
      setLoading(false);
    }
  };

  return (
    <Box display="flex" minHeight="100vh">
      <Box flex={1} display="flex" alignItems="center" justifyContent="center">
        <Box width={360}>
          <Typography variant="h4" fontWeight={700} mb={3}>
            Get Started Now
          </Typography>

          <form onSubmit={handleSubmit}>
            {error && (
              <Typography color="error" mb={2}>
                {error}
              </Typography>
            )}

            <TextField
              fullWidth
              label="Username"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <TextField
              fullWidth
              label="Email address"
              type="email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <TextField
              fullWidth
              label="Confirm password"
              type="password"
              margin="normal"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />

            <Button
              fullWidth
              type="submit"
              disabled={loading}
              sx={{
                mt: 3,
                bgcolor: "#2e7d32",
                "&:hover": { bgcolor: "#1b5e20" },
              }}
              variant="contained"
            >
              {loading ? "Signing up..." : "Signup"}
            </Button>
          </form>

          <Typography mt={3}>
            Have an account? <Link to="/login">Sign In</Link>
          </Typography>
        </Box>
      </Box>

      <Box flex={1} display={{ xs: "none", md: "block" }}>
        <img
          src={leaf}
          alt="Eco"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>
    </Box>
  );
}

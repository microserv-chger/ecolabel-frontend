import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Box, Button, TextField, Typography } from "@mui/material";
import leaf from "../assets/1.webp";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login({ username, password });
      navigate("/");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      setLoading(false);
    }
  };

  return (
    <Box display="flex" minHeight="100vh">
      {/* LEFT */}
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box width={360}>
          <Typography variant="h4" fontWeight={700} mb={1}>
            Welcome back!
          </Typography>
          <Typography color="text.secondary" mb={4}>
            Enter your credentials to access your account
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
              type="submit"
              disabled={loading}
              sx={{
                mt: 3,
                bgcolor: "#2e7d32",
                "&:hover": { bgcolor: "#1b5e20" },
              }}
              variant="contained"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <Typography mt={3}>
            Don’t have an account?{" "}
            <Link to="/signup">Sign Up</Link>
          </Typography>
        </Box>
      </Box>

      {/* RIGHT IMAGE */}
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

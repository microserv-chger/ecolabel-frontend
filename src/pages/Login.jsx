import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Box, Button, TextField, Typography } from "@mui/material";
import leaf from "../assets/1.webp";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
    navigate("/");
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
            <TextField
              fullWidth
              label="Email address"
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
              type="submit"
              sx={{
                mt: 3,
                bgcolor: "#2e7d32",
                "&:hover": { bgcolor: "#1b5e20" },
              }}
              variant="contained"
            >
              Login
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

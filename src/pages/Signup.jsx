import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Box, Button, TextField, Typography } from "@mui/material";
import leaf from "../assets/1.webp";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) return alert("Passwords do not match");
    signup({ email, password });
    navigate("/");
  };

  return (
    <Box display="flex" minHeight="100vh">
      <Box flex={1} display="flex" alignItems="center" justifyContent="center">
        <Box width={360}>
          <Typography variant="h4" fontWeight={700} mb={3}>
            Get Started Now
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

            <TextField
              fullWidth
              label="Confirm password"
              type="password"
              margin="normal"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
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
              Signup
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

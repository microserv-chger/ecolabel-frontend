import { Snackbar, Alert } from "@mui/material";

export default function AppToast({ open, onClose, severity = "success", message }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2600}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert onClose={onClose} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
}

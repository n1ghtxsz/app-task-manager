// CustomAlert.js
import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function CustomAlert({ open, onClose, message }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      TransitionComponent={SlideTransition}  // sempre slide
    >
      <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

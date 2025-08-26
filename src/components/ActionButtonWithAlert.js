import React, { useState } from "react";
import { Button, Slide } from "@mui/material";
import CustomAlert from "./CustomAlert";

// animação de entrada
const SlideTransition = (props) => {
  return <Slide {...props} direction="up" />;
};

export default function ActionButtonWithAlert({
  buttonText,
  buttonSize = "medium",
  buttonType = "button",
  alertMessage,
  variant = "contained",
}) {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        onClick={handleClick}
        type={buttonType}
        variant={variant}
        size={buttonSize}
      >
        {buttonText}
      </Button>

      <CustomAlert
        open={open}
        onClose={handleClose}
        message={alertMessage}
        TransitionComponent={SlideTransition}
      />
    </>
  );
}

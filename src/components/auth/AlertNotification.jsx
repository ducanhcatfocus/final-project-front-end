import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { connect } from "react-redux";

const AlertNotification = (props) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open
      onClose={() => {}}
      // autoHideDuration={5000}
    >
      <Alert security="info">dasdsadasd</Alert>
    </Snackbar>
  );
};

export default AlertNotification;

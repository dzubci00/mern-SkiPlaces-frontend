import React from "react";

import Modal from "./Modal";
import Button from "../FormElements/Button";

const ErrorModal = (props) => {
  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      timeout={props.timeout}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p style={{ padding: "0.5rem" }}>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;

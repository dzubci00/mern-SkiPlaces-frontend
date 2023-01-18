import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./Backdrop.css";

const Backdrop = (props) => {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={props.timeout}
      classNames={props.classNames}
      mountOnEnter
      unmountOnExit
    >
      <div className="backdrop" onClick={props.onClick}></div>
    </CSSTransition>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;

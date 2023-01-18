import React from "react";
import "./Hamburger.css";

const Hamburger = (props) => {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={`hamburger${props.className} line`}
    >
      <span className="line"></span>
      <span className="line"></span>
      <span className="line"></span>
    </button>
  );
};

export default Hamburger;

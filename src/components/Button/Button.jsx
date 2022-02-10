import React from "react";
import "./Button.css";

const Button = ({ children, className, clickHandler, type, disabled }) => {
  return (
    <button
      className={className}
      onClick={clickHandler}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;

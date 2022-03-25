import React from "react";
import "./InputError.css";

const InputError = ({ errorMessage }) => {
  return <small className="erorr">{errorMessage}</small>;
};

export default InputError;

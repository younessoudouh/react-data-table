import React from "react";
import "./Select.css";

const Select = ({ value, changeHandler, options, className, name }) => {
  return (
    <select
      name={name}
      value={value}
      onChange={changeHandler}
      className={className}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;

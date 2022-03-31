import React, { memo } from "react";
import "./Select.css";

const Select = ({ options, ...rest }) => {
  return (
    <select {...rest}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default memo(Select);

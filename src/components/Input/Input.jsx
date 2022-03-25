import React from "react";

const Input = ({id, type, value, changeHandler, checked, label }) => {
  return (
    <div className="sort-option">
      <label htmlFor={id} className="sort-label">
        {label}
      </label>
      <input
        className="sort-input"
        type={type}
        id={id}
        value={value}
        onChange={changeHandler}
        checked={checked}
      />
    </div>
  );
};

export default Input;

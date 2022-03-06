import React from "react";
import InputError from "../InputError/InputError";

const FormSelect = ({
  name,
  className,
  changeHandler,
  value,
  options,
  isInputValid,
  errorMessage,
  blurHandler,
}) => {
  return (
    <div>
      <select
        name={name}
        value={value}
        onChange={changeHandler}
        onBlur={blurHandler}
        className={`add-customer-input
        ${!value && !errorMessage ? "" : errorMessage ? "error" : "success"}`}
      >
        {options.map((option, index) =>
          index === 0 ? (
            <option key={index} value="" disbled="true" hidden>
              {option}
            </option>
          ) : (
            <option key={index} value={option}>
              {option}
            </option>
          )
        )}
      </select>
      {isInputValid ? (
        <i className="fas fa-check-circle"></i>
      ) : (
        <InputError errorMessage={errorMessage} />
      )}
    </div>
  );
};

export default FormSelect;

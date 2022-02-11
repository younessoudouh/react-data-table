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
  blurHandler
}) => {
  return (
    <div>
      <select
        name={name}
        value={value}
        onChange={changeHandler}
        onBlur={blurHandler}
        className={`add-customer-input ${className}`}
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
      {errorMessage ? <InputError errorMessage={errorMessage} /> : null}
      {isInputValid ? <i className="fas fa-check-circle"></i> : null}
    </div>
  );
};

export default FormSelect;

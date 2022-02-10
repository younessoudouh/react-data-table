import React from "react";
import InputError from "../InputError/InputError";

const FormInput = ({
  name,
  type,
  placeholder,
  maxLength,
  changeHandler,
  blurHandler,
  value,
  className,
  isInputValid,
  errorMessage,
  refer,
}) => {
  return (
    <div>
      <input
        onChange={changeHandler}
        onBlur={blurHandler}
        type={type}
        name={name}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`add-customer-input ${className}`}
        value={value}
        ref={refer}
      />
      {!isInputValid ? <InputError errorMessage={errorMessage} /> : null}
      {isInputValid ? <i className="fas fa-check-circle"></i> : null}
    </div>
  );
};

export default FormInput;

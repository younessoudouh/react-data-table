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
        className={`add-customer-input
          ${!value && !errorMessage ? "" : errorMessage ? "error" : "success"}`}
        value={value}
        ref={refer}
      />
      {isInputValid ? (
        <i className="fas fa-check-circle"></i>
      ) : (
        <InputError errorMessage={errorMessage} />
      )}
    </div>
  );
};

export default FormInput;

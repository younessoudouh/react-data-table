import React, { useEffect, useRef, useState } from "react";
import "./Form.css";
import FormInput from "../FormInput/FormInput";
import Button from "../Button/Button";
import InputError from "../InputError/InputError";
import FormSelect from "../FormSelect/FormSelect";

const Form = ({
  setCustomersData,
  setAddCustomerOpen,
  customersData,
  setIsSubmited,
  setNotificationMessage,
}) => {
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    id: "",
    balance: "",
    rate: "",
    deposit: "",
    status: "",
    currency: "",
    description: "",
  });
  const [errors, setErrors] = useState(customerInfo);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    let isFormValid = Object.values(errors).every(
      (error) => error.length === 0
    );

    Object.entries(customerInfo).forEach(
      ([inputName, inputValue]) =>
        inputValue.length === 0 &&
        setErrors((previous) => ({
          ...previous,
          [inputName]: inputName + " can`t be blank",
        }))
    );

    if (isFormValid) {
      setCustomersData((previous) => [
        { ...customerInfo, highlighted: true },
        ...previous,
      ]);
      setAddCustomerOpen(false);
      setIsSubmited(true);
      setNotificationMessage(
        `You Added ${customerInfo.firstName} Successfully`
      );
    }
  };

  const validateFirstName = (event, customers) => {
    const { name: inputName, value: inputValue } = event.target;

    if (hasValue(inputValue, inputName)) {
      setCustomerInfo((previous) => ({
        ...previous,
        [inputName]: wordCapitalize(inputValue),
      }));
    } else if (checkOnlyLetters(inputValue, inputName, /^[a-zA-Z]*$/)) {
      setCustomerInfo((previous) => ({
        ...previous,
        [inputName]: wordCapitalize(inputValue),
      }));
    } else if (isFirstNameExist(inputValue, inputName, customers)) {
      setCustomerInfo((previous) => ({
        ...previous,
        [inputName]: wordCapitalize(inputValue),
      }));
    } else {
      setCustomerInfo((previous) => ({
        ...previous,
        [inputName]: wordCapitalize(inputValue),
      }));
    }
  };

  const validateLastName = (event) => {
    const { name: inputName, value: inputValue } = event.target;

    if (hasValue(inputValue, inputName)) {
      setCustomerInfo((previous) => ({
        ...previous,
        [inputName]: wordCapitalize(inputValue),
      }));
    } else if (checkOnlyLetters(inputValue, inputName, /^[a-zA-Z]*$/)) {
      setCustomerInfo((previous) => ({
        ...previous,
        [inputName]: wordCapitalize(inputValue),
      }));
    }
    setCustomerInfo((previous) => ({
      ...previous,
      [inputName]: wordCapitalize(inputValue),
    }));
  };

  const validateNumber = (event, customers) => {
    const { name: inputName, value: inputValue } = event.target;

    if (hasValue(inputValue, inputName)) {
      setCustomerInfo((previous) => ({ ...previous, [inputName]: inputValue }));
    } else if (isNumber(inputValue, inputName)) {
      setCustomerInfo((previous) => ({ ...previous, [inputName]: inputValue }));
    } else if (validLength(inputValue, inputName)) {
      setCustomerInfo((previous) => ({ ...previous, [inputName]: inputValue }));
    } else if (isNumberExist(inputValue, inputName, customers)) {
      setCustomerInfo((previous) => ({ ...previous, [inputName]: inputValue }));
    }
    setCustomerInfo((previous) => ({ ...previous, [inputName]: inputValue }));
  };

  const validateDeposit = (event) => {
    const { name: inputName, value: inputValue } = event.target;

    if (hasValue(inputValue, inputName)) {
      setCustomerInfo((previous) => ({ ...previous, [inputName]: inputValue }));
    } else if (isNumber(inputValue, inputName)) {
      setCustomerInfo((previous) => ({ ...previous, [inputName]: inputValue }));
    }
    setCustomerInfo((previous) => ({ ...previous, [inputName]: inputValue }));
  };

  const validateRate = (event) => {
    const { name: inputName, value: inputValue } = event.target;

    if (hasValue(inputValue, inputName)) {
      setCustomerInfo((previous) => ({ ...previous, [inputName]: inputValue }));
    } else if (isNumber(inputValue, inputName)) {
      setCustomerInfo((previous) => ({ ...previous, [inputName]: inputValue }));
    }
    setCustomerInfo((previous) => ({ ...previous, [inputName]: inputValue }));
  };

  const validateBalance = (event) => {
    const { name: inputName, value: inputValue } = event.target;

    if (hasValue(inputValue, inputName)) {
      setCustomerInfo((previous) => ({ ...previous, [inputName]: inputValue }));
    } else if (isNumber(inputValue, inputName)) {
      setCustomerInfo((previous) => ({ ...previous, [inputName]: inputValue }));
    }
    setCustomerInfo((previous) => ({ ...previous, [inputName]: inputValue }));
  };

  const validateCurrency = (event) => {
    const { name: inputName, value: inputValue } = event.target;

    if (hasValue(inputValue, inputName)) {
      setCustomerInfo((previous) => ({ ...previous, [inputName]: inputValue }));
    }
    setCustomerInfo((previous) => ({ ...previous, [inputName]: inputValue }));
  };

  const validateStatus = (event) => {
    const { name: inputName, value: inputValue } = event.target;

    if (hasValue(inputValue, inputName)) {
      setCustomerInfo((previous) => ({ ...previous, [inputName]: inputValue }));
    }
    setCustomerInfo((previous) => ({ ...previous, [inputName]: inputValue }));
  };

  const validateDescription = (event) => {
    const { name: inputName, value: inputValue } = event.target;

    if (hasValue(inputValue, inputName)) {
      setCustomerInfo((previous) => ({ ...previous, [inputName]: inputValue }));
    } else if (validLength(inputValue, inputName)) {
      setCustomerInfo((previous) => ({ ...previous, [inputName]: inputValue }));
    }
    setCustomerInfo((previous) => ({ ...previous, [inputName]: inputValue }));
  };

  const isNumberExist = (inputValue, inputName, customers) => {
    let isExist = customers.some((customer) => customer.id == inputValue);
    if (isExist) {
      setErrors((previous) => ({
        ...previous,
        [inputName]: inputName + " already exist",
      }));
      return true;
    }
    setErrors((previous) => ({
      ...previous,
      [inputName]: "",
    }));
    return false;
  };

  const wordCapitalize = (word) => {
    if (!word) return word;
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  };

  const isNumber = (inputValue, inputName) => {
    if (isNaN(inputValue)) {
      setErrors((previous) => ({
        ...previous,
        [inputName]: inputName + " should be numbers",
      }));
      return true;
    }
    setErrors((previous) => ({
      ...previous,
      [inputName]: "",
    }));
    return false;
  };

  const validLength = (inputValue, inputName) => {
    if (inputValue.length < 10) {
      if (inputName === "id") {
        setErrors((previous) => ({
          ...previous,
          [inputName]: inputName + " should be 10 digits",
        }));
        return true;
      } else if (inputName === "description") {
        setErrors((previous) => ({
          ...previous,
          [inputName]: inputName + " should at least have 10 characters",
        }));
        return true;
      }
    }
    setErrors((previous) => ({ ...previous, [inputName]: "" }));
    return false;
  };

  const hasValue = (inputValue, inputName) => {
    if (!inputValue.trim()) {
      setErrors((previous) => ({
        ...previous,
        [inputName]: inputName + " can`t be blank",
      }));
      return true;
    }
    setErrors((previous) => ({ ...previous, [inputName]: "" }));
    return false;
  };

  const checkOnlyLetters = (inputValue, inputName, regx) => {
    if (!inputValue.match(regx)) {
      setErrors((previous) => ({
        ...previous,
        [inputName]: inputName + " should contains only letters",
      }));
      return true;
    }
    setErrors((previous) => ({ ...previous, [inputName]: "" }));
    return false;
  };

  const isFirstNameExist = (inputValue, inputName, customers) => {
    let isExist = customers.some(
      (customer) =>
        customer.firstName.toLowerCase() === inputValue.toLowerCase()
    );
    if (isExist) {
      setErrors((previous) => ({
        ...previous,
        [inputName]: inputName + " already exist",
      }));
      return true;
    }
    setErrors((previous) => ({ ...previous, [inputName]: "" }));
    return false;
  };

  const handleCuncel = () => {
    setAddCustomerOpen(false);
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <h2 className="form-header">Add Customer</h2>
      <section className="first-section">
        <FormInput
          type="text"
          value={customerInfo.firstName}
          name="firstName"
          placeholder="First Name"
          changeHandler={(event) => validateFirstName(event, customersData)}
          blurHandler={(event) => validateFirstName(event, customersData)}
          isInputValid={customerInfo.firstName && !errors.firstName}
          errorMessage={errors.firstName}
          refer={inputRef}
        />
        <FormInput
          type="text"
          name="lastName"
          value={customerInfo.lastName}
          placeholder="Last Name"
          changeHandler={(event) => validateLastName(event)}
          isInputValid={customerInfo.lastName && !errors.lastName}
          errorMessage={errors.lastName}
        />
        <FormInput
          type="text"
          name="id"
          value={customerInfo.number}
          maxLength="10"
          placeholder="Number"
          changeHandler={(event) => validateNumber(event, customersData)}
          isInputValid={customerInfo.id && !errors.id}
          errorMessage={errors.id}
        />
        <FormSelect
          type="text"
          name="status"
          value={customerInfo.status}
          placeholder="status"
          className="add-customer-input"
          changeHandler={(event) => validateStatus(event)}
          isInputValid={customerInfo.status && !errors.status}
          errorMessage={errors.status}
          options={["Select status", "active", "inactive"]}
        />
      </section>
      <section className="second-section">
        <FormInput
          type="text"
          name="rate"
          value={customerInfo.rate}
          placeholder="Rate"
          changeHandler={(event) => validateRate(event)}
          isInputValid={customerInfo.rate && !errors.rate}
          errorMessage={errors.rate}
        />
        <FormInput
          type="text"
          name="deposit"
          value={customerInfo.deposit}
          placeholder="Deposit"
          changeHandler={(event) => validateDeposit(event)}
          isInputValid={customerInfo.deposit && !errors.deposit}
          errorMessage={errors.deposit}
        />
        <FormInput
          type="text"
          name="balance"
          value={customerInfo.balance}
          placeholder="Balance"
          changeHandler={(event) => validateBalance(event)}
          isInputValid={customerInfo.balance && !errors.balance}
          errorMessage={errors.balance}
        />
        <FormSelect
          type="text"
          name="currency"
          value={customerInfo.currency}
          placeholder="Currency"
          className="add-customer-input"
          changeHandler={(event) => validateCurrency(event)}
          isInputValid={customerInfo.currency && !errors.currency}
          errorMessage={errors.currency}
          options={["Select currency", "EUR", "INR", "USD"]}
        />
      </section>
      <section className="third-section">
        <div>
          <textarea
            className="add-customer-input"
            name="description"
            rows="2"
            cols="20"
            placeholder="Description..."
            onChange={(event) => validateDescription(event)}
          />
          {errors.description ? (
            <InputError errorMessage={errors.description} />
          ) : null}
          {customerInfo.description && !errors.description ? (
            <i className="fas fa-check-circle"></i>
          ) : null}
        </div>
      </section>
      <section className="btn-group">
        <Button className="btn" type="submit">
          Submit
        </Button>
        <Button className="btn" type="button" clickHandler={handleCuncel}>
          Cuncel
        </Button>
      </section>
    </form>
  );
};

export default Form;

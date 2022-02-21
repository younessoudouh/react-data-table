import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Form.css";
import FormInput from "../FormInput/FormInput";
import Button from "../Button/Button";
import InputError from "../InputError/InputError";
import FormSelect from "../FormSelect/FormSelect";

const Form = ({
  setCustomersData,
  setAddCustomerOpen,
  customersData,
  setNotificationMessage,
  addCustomerOpen,
  editOpen,
  setEditOpen,
  customerToEdit,
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
  const [errors, setErrors] = useState({});
  const inputRef = useRef();
  const firstRender = useRef(true);
  const customersToUseForEdit = useMemo(() => {
    return customersData.filter(
      (customer) => customer.id !== customerToEdit.id
    );
  }, []);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (editOpen) {
      setCustomerInfo(customerToEdit);
    }
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      return;
    } else if (firstRender.current) {
      return;
    }
    validateLastName();
  }, [customerInfo.lastName]);

  useEffect(() => {
    if (editOpen) {
      validateFirstName(customersToUseForEdit);
      return;
    } else if (firstRender.current) {
      return;
    }
    validateFirstName(customersData);
  }, [customerInfo.firstName]);

  useEffect(() => {
    if (editOpen) {
      validateNumber(customersToUseForEdit);
      return;
    } else if (firstRender.current) {
      return;
    }
    validateNumber(customersData);
  }, [customerInfo.id]);

  useEffect(() => {
    if (firstRender.current) {
      return;
    }
    validateStatus();
  }, [customerInfo.status]);

  useEffect(() => {
    if (firstRender.current) {
      return;
    }
    validateCurrency();
  }, [customerInfo.currency]);

  useEffect(() => {
    if (firstRender.current) {
      return;
    }
    validateRate();
  }, [customerInfo.rate]);

  useEffect(() => {
    if (firstRender.current) {
      return;
    }
    validateBalance();
  }, [customerInfo.balance]);

  useEffect(() => {
    if (firstRender.current) {
      return;
    }
    validateDeposit();
  }, [customerInfo.deposit]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    validateDescription();
  }, [customerInfo.description]);

  const submitHandler = (event) => {
    event.preventDefault();
    validateFirstName(customersData);
    validateNumber(customersData);
    validateLastName();
    validateRate();
    validateDeposit();
    validateBalance();
    validateStatus();
    validateCurrency();
    validateDescription();
    let isFormValid;
    setErrors((previous) => {
      isFormValid = Object.values(errors).every((error) => error.length === 0);
      return previous;
    });

    if (isFormValid) {
      localStorage.setItem(
        "customers",
        JSON.stringify([customerInfo, ...customersData])
      );

      setCustomersData((previous) => [
        { ...customerInfo, highlighted: true },
        ...previous,
      ]);
      setAddCustomerOpen(false);
      setNotificationMessage(
        `You Added ${customerInfo.firstName} Successfully`
      );
    }
  };

  const updateCustomersData = () => {
    let customerToEditIndex = customersData.findIndex(
      (customer) => customer.id == customerToEdit.id
    );
    customersToUseForEdit.splice(customerToEditIndex, 0, {
      ...customerInfo,
      highlighted: true,
    });
    return customersToUseForEdit;
  };

  const editHandler = () => {
    let isFormValid = Object.values(errors).every(
      (error) => error.length === 0
    );

    if (isFormValid) {
      setCustomersData(updateCustomersData());

      localStorage.setItem("customers", JSON.stringify(customersToUseForEdit));
      setEditOpen(false);
      setNotificationMessage(`You Edit ${customerInfo.firstName} Successfully`);
    }
  };

  const validateFirstName = (customers) => {
    if (hasValue(customerInfo.firstName, "firstName")) return;
    if (checkOnlyLetters(customerInfo.firstName, "firstName", /^[a-zA-Z]*$/))
      return;
    isFirstNameExist(customerInfo.firstName, "firstName", customers);
  };

  const validateLastName = () => {
    if (hasValue(customerInfo.lastName, "lastName")) return;
    if (checkOnlyLetters(customerInfo.lastName, "lastName", /^[a-zA-Z]*$/));
  };

  const validateNumber = (customers) => {
    if (hasValue(customerInfo.id, "id")) return;
    if (isNumber(customerInfo.id, "id")) return;
    if (validLength(customerInfo.id, "id")) return;
    isNumberExist(customerInfo.id, "id", customers);
  };

  const validateDeposit = () => {
    if (hasValue(customerInfo.deposit, "deposit")) return;
    isNumber(customerInfo.deposit, "deposit");
  };

  const validateRate = () => {
    if (hasValue(customerInfo.rate, "rate")) return;
    isNumber(customerInfo.rate, "rate");
  };

  const validateBalance = () => {
    if (hasValue(customerInfo.balance, "balance")) return;
    isNumber(customerInfo.balance, "balance");
  };

  const validateCurrency = () => {
    hasValue(customerInfo.currency, "currency");
  };

  const validateStatus = () => {
    hasValue(customerInfo.status, "status");
  };

  const validateDescription = () => {
    if (hasValue(customerInfo.description, "description")) return;
    validLength(customerInfo.description, "description");
  };

  const isNumberExist = (inputValue, inputName, customers) => {
    let isExist = customers.some(
      (customer) => customer.id === Number(inputValue)
    );
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
    if (!String(inputValue).trim()) {
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
    setEditOpen(false);
  };

  const handleFormInputChange = (event) => {
    const { name: inputName, value: inputValue } = event.target;
    setCustomerInfo((previous) => ({ ...previous, [inputName]: inputValue }));
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
          changeHandler={(event) => handleFormInputChange(event)}
          isInputValid={customerInfo.firstName && !errors.firstName}
          errorMessage={errors.firstName}
          refer={inputRef}
        />
        <FormInput
          type="text"
          name="lastName"
          value={customerInfo.lastName}
          placeholder="Last Name"
          changeHandler={(event) => handleFormInputChange(event)}
          isInputValid={customerInfo.lastName && !errors.lastName}
          errorMessage={errors.lastName}
        />
        <FormInput
          type="text"
          name="id"
          value={customerInfo.id}
          maxLength="10"
          placeholder="Number"
          changeHandler={(event) => handleFormInputChange(event)}
          isInputValid={customerInfo.id && !errors.id}
          errorMessage={errors.id}
        />
        <FormSelect
          type="text"
          name="status"
          value={customerInfo.status}
          placeholder="status"
          changeHandler={(event) => handleFormInputChange(event)}
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
          changeHandler={(event) => handleFormInputChange(event)}
          isInputValid={customerInfo.rate && !errors.rate}
          errorMessage={errors.rate}
        />
        <FormInput
          type="text"
          name="deposit"
          value={customerInfo.deposit}
          placeholder="Deposit"
          changeHandler={(event) => handleFormInputChange(event)}
          isInputValid={customerInfo.deposit && !errors.deposit}
          errorMessage={errors.deposit}
        />
        <FormInput
          type="text"
          name="balance"
          value={customerInfo.balance}
          placeholder="Balance"
          changeHandler={(event) => handleFormInputChange(event)}
          isInputValid={customerInfo.balance && !errors.balance}
          errorMessage={errors.balance}
        />
        <FormSelect
          type="text"
          name="currency"
          value={customerInfo.currency}
          placeholder="Currency"
          changeHandler={(event) => handleFormInputChange(event)}
          isInputValid={customerInfo.currency && !errors.currency}
          errorMessage={errors.currency}
          options={["Select currency", "EUR", "INR", "USD"]}
        />
      </section>
      <section className="third-section">
        <div>
          <textarea
            className={`add-customer-input
              ${
                !customerInfo.description && !errors.description
                  ? ""
                  : errors.description
                  ? "error"
                  : "success"
              }`}
            name="description"
            value={customerInfo.description}
            rows="2"
            cols="20"
            placeholder="Description..."
            onChange={(event) => handleFormInputChange(event)}
          />
          {customerInfo.description && !errors.description ? (
            <i className="fas fa-check-circle"></i>
          ) : (
            <InputError errorMessage={errors.description} />
          )}
        </div>
      </section>
      <section className="btn-group">
        {addCustomerOpen && (
          <Button className="btn" type="submit">
            Submit
          </Button>
        )}
        {editOpen && (
          <Button className="btn" type="button" clickHandler={editHandler}>
            Edit
          </Button>
        )}
        <Button className="btn" type="button" clickHandler={handleCuncel}>
          Cuncel
        </Button>
      </section>
    </form>
  );
};

export default Form;

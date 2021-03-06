import React, { useContext } from "react";
import "./Table.css";
import CustomerRow from "../CustomerRow/CustomerRow";
import { globalContext } from "../../Hooks/GlobalContext";

const Table = ({
  customersData,
  customersReadyToRender,
  setCustomersData,
  setUpdateCustomerOpen,
  setCustomerToEdit,
}) => {
  const { sort, setSort } = useContext(globalContext);

  const setCustomersInLocalStorage = (customersList) =>
    localStorage.setItem("customers", JSON.stringify(customersList));

  const deleteCustomer = (customerId, customers) => {
    if (window.confirm("are you sure")) {
      let updatedCustomers = customers.filter(
        (customer) => customer.id !== customerId
      );
      setCustomersData(updatedCustomers);
      setCustomersInLocalStorage(updatedCustomers);
    }
  };

  const handleStatusClick = () => {
    if (sort.status === "sort-default") {
      setSort((previous) => ({ ...previous, status: "sort-active" }));
    } else if (sort.status === "sort-active") {
      setSort((previous) => ({ ...previous, status: "sort-inactive" }));
    } else {
      setSort((previous) => ({ ...previous, status: "sort-default" }));
    }
  };

  const handleNameClick = () => {
    if (sort.name === "sort-default") {
      setSort((previous) => ({ ...previous, name: "sort-asc" }));
    } else if (sort.name === "sort-asc") {
      setSort((previous) => ({ ...previous, name: "sort-desc" }));
    } else {
      setSort((previous) => ({ ...previous, name: "sort-default" }));
    }
  };

  const getCustomerToEdit = (customerId, customers) => {
    setUpdateCustomerOpen(true);
    let customerToEdit = customers.find(
      (customer) => customer.id == customerId
    );
    setCustomerToEdit(customerToEdit);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>
            <input type="checkbox" />
          </th>
          <th className={`name-field ${sort.name}`} onClick={handleNameClick}>
            name
          </th>
          <th> description</th>
          <th>rate</th>
          <th>balance</th>
          <th>deposit</th>
          <th className={`status ${sort.status}`} onClick={handleStatusClick}>
            status
          </th>
          <th>
            <i className="fas fa-ellipsis-h"></i>
          </th>
        </tr>
      </thead>
      <tbody>
        {customersReadyToRender.map((customer) => (
          <CustomerRow
            key={customer.id}
            deleteClickHandler={() =>
              deleteCustomer(customer.id, customersData)
            }
            editClickHandler={() =>
              getCustomerToEdit(customer.id, customersData)
            }
            {...customer}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;

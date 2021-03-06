import React, { useCallback, useContext, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Table from "./components/Table/Table";
import Footer from "./components/Footer/Footer";
import customers from "./Customers";
import "./index.css";
import Modal from "./components/Modal/Modal";
import Form from "./components/Form/Form";
import Notification from "./components/Notification/Notification";
import { globalContext } from "./Hooks/GlobalContext";

const App = () => {
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("customers")) === null) {
      localStorage.setItem("customers", JSON.stringify(customers));
    }
  }, []);

  const getCustomersFromLocalStorage = () => {
    return localStorage.getItem("customers")
      ? JSON.parse(localStorage.getItem("customers"))
      : [];
  };

  const [customersData, setCustomersData] = useState(() =>
    getCustomersFromLocalStorage()
  );
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [addCustomerOpen, setAddCustomerOpen] = useState(false);
  const [updateCustomerOpen, setUpdateCustomerOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [customerToEdit, setCustomerToEdit] = useState({});
  const { searchValue, currentPage, setCurrentPage, sort } =
    useContext(globalContext);

  const resetNotificationMessage = useCallback(() => {
    const removeHighlight = () => {
      return customersData.map((customer) =>
        customer.highlighted ? { ...customer, highlighted: false } : customer
      );
    };

    if (notificationMessage) {
      setTimeout(() => {
        setNotificationMessage("");
        setCustomersData(removeHighlight());
        localStorage.setItem("customers", JSON.stringify(removeHighlight()));
      }, 3000);
    }
  }, [notificationMessage]);

  useEffect(() => {
    resetNotificationMessage();
  }, [resetNotificationMessage]);

  const searchCustomers = (customersToSearchIn) => {
    let valueToSearch = searchValue.toLowerCase();
    let searchedCustomers = customersToSearchIn.filter((customer) => {
      return (
        customer.firstName.toLowerCase().includes(valueToSearch) ||
        customer.lastName.toLowerCase().includes(valueToSearch) ||
        customer.description.toLowerCase().includes(valueToSearch) ||
        customer.id.toString().indexOf(valueToSearch) > -1
      );
    });

    return searchedCustomers;
  };

  const sortCustomersByName = (customers, sortOrder) => {
    let customersToSort = customers.slice();

    if (sortOrder.name === "sort-asc") {
      return customersToSort.sort((customer1, customer2) =>
        customer1.firstName > customer2.firstName ? 1 : -1
      );
    }

    if (sortOrder.name === "sort-desc") {
      return customersToSort.sort((customer1, customer2) =>
        customer1.firstName > customer2.firstName ? -1 : 1
      );
    }

    return customersToSort;
  };

  const sortCustomersByStatus = (customers, sortOrder) => {
    if (sortOrder.status === "sort-active") {
      return customers
        .filter((customer) => customer.status === "active")
        .concat(customers.filter((customer) => customer.status === "inactive"));
    }

    if (sortOrder.status === "sort-inactive") {
      return customers
        .filter((customer) => customer.status === "inactive")
        .concat(customers.filter((customer) => customer.status === "active"));
    }
    return customers;
  };

  const sortCombined = (customers, sortOrders) => {
    if (
      sortOrders.name === "sort-default" &&
      sortOrders.status === "sort-default"
    )
      return customers;

    let sortedByName = sortCustomersByName(customers, sortOrders);

    return sortCustomersByStatus(sortedByName, sortOrders);
  };

  const sortedCustomers = sortCombined(customersData, sort);
  const searchedCustomers = searchCustomers(sortedCustomers);
  const activeCustomersCount = customersData.filter(
    (customer) => customer.status === "active"
  ).length;
  const allCustomersCount = searchedCustomers.length;
  const customersReadyToRender = searchedCustomers.slice(
    (currentPage - 1) * rowsPerPage,
    rowsPerPage * currentPage
  );

  if (customersReadyToRender.length === 0 && currentPage !== 1) {
    setCurrentPage((previous) => previous - 1);
  }

  return (
    <div className="container">
      {notificationMessage && <Notification content={notificationMessage} />}
      {addCustomerOpen || updateCustomerOpen ? (
        <Modal>
          <Form
            setCustomersData={setCustomersData}
            customersData={customersData}
            setAddCustomerOpen={setAddCustomerOpen}
            setNotificationMessage={setNotificationMessage}
            addCustomerOpen={addCustomerOpen}
            updateCustomerOpen={updateCustomerOpen}
            setUpdateCustomerOpen={setUpdateCustomerOpen}
            customerToEdit={customerToEdit}
          />
        </Modal>
      ) : null}
      <Header setAddCustomerOpen={setAddCustomerOpen} />
      <Table
        customersData={customersData}
        customersReadyToRender={customersReadyToRender}
        setCustomersData={setCustomersData}
        setUpdateCustomerOpen={setUpdateCustomerOpen}
        setCustomerToEdit={setCustomerToEdit}
      />
      {customersReadyToRender.length === 0 ? null : (
        <Footer
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          allCustomersCount={allCustomersCount}
          customersReadyToRender={customersReadyToRender}
          activeCustomersCount={activeCustomersCount}
          customersData={customersData}
        />
      )}
    </div>
  );
};

export default App;

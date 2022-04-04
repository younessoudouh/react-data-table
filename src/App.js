import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Header from "./components/Header/Header";
import Table from "./components/Table/Table";
import Footer from "./components/Footer/Footer";
import "./index.css";
import Modal from "./components/Modal/Modal";
import Form from "./components/Form/Form";
import Notification from "./components/Notification/Notification";
import { globalContext } from "./Hooks/GlobalContext";
import useData from "./Hooks/useData";

const App = () => {
  const [customersData, setCustomersData] = useData();
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
  }, [notificationMessage, customersData]);

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
        .filter((customer) => customer.status.toLowerCase() === "active")
        .concat(
          customers.filter(
            (customer) => customer.status.toLowerCase() === "inactive"
          )
        );
    }

    if (sortOrder.status === "sort-inactive") {
      return customers
        .filter((customer) => customer.status.toLowerCase() === "inactive")
        .concat(
          customers.filter(
            (customer) => customer.status.toLowerCase() === "active"
          )
        );
    }
    return customers;
  };

  const sortCombined = (customers) => {
    if (sort.name === "sort-default" && sort.status === "sort-default")
      return customers;

    let sortedByName = sortCustomersByName(customers, sort);

    return sortCustomersByStatus(sortedByName, sort);
  };

  const sortedCustomers = useMemo(
    () => sortCombined(customersData),
    [sort, customersData]
  );
  const searchedCustomers = useMemo(
    () => searchCustomers(sortedCustomers),
    [searchValue, sortedCustomers]
  );

  const allCustomersCount = useMemo(() => {
    return searchedCustomers.length;
  }, [searchedCustomers]);

  const customersReadyToRender = searchedCustomers.slice(
    (currentPage - 1) * rowsPerPage,
    rowsPerPage * currentPage
  );

  const handleClickOnAddCustomer = useCallback(() => {
    setAddCustomerOpen(true);
  }, []);

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
      <Header handleClickOnAddCustomer={handleClickOnAddCustomer} />
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
          customersData={customersData}
        />
      )}
    </div>
  );
};

export default App;

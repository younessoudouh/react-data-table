import Header from './Header/Header';
import Table from "./Table/Table";
import Footer from './Footer/Footer';
import customers from "../Customers";
import React, { useState } from 'react';
import "../index.css"

const Main = () => {
  (() => {
    if (JSON.parse(localStorage.getItem("customers")) === null) {
      localStorage.setItem("customers", JSON.stringify(customers));
    }
  })()

  const getCustomersFromLocalStorage = () => {
    return localStorage.getItem("customers") ? JSON.parse(localStorage.getItem("customers")) : [];
  };

  const [customersData, setCustomersData] = useState(() => getCustomersFromLocalStorage());
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [sort, setSort] = useState({ name: "sort-default", status: "sort-default" });

  const searchCustomers = customersToSearchIn => {
    let valueToSearch = searchValue.toLowerCase();
    let searchedCustomers = customersToSearchIn.filter(customer => {
      return (
        customer.firstName.toLowerCase().includes(valueToSearch)
        || customer.lastName.toLowerCase().includes(valueToSearch)
        || customer.description.toLowerCase().includes(valueToSearch)
        || customer.id.toString().includes(valueToSearch)
      );
    })

    return searchedCustomers;
  }

  const sortCustomersByName = (customers, sortOrder) => {
    let customersToSort = customers.slice();

    if (sortOrder.name === "sort-asc") {
      return customersToSort.sort((customer1, customer2) => (customer1.firstName > customer2.firstName) ? 1 : -1);
    }

    if (sortOrder.name === "sort-desc") {
      return customersToSort.sort((customer1, customer2) => (customer1.firstName > customer2.firstName) ? -1 : 1);
    }

    return customersToSort;
  }

  const sortCustomersByStatus = (customers, sortOrder) => {
    if (sortOrder.status === "sort-active") {
      return (customers.filter((customer) => customer.status === "active"))
        .concat(customers.filter((customer) => customer.status === "inactive"))
    }

    if (sortOrder.status === "sort-inactive") {
      return (customers.filter((customer) => customer.status === "inactive"))
        .concat(customers.filter((customer) => customer.status === "active"))
    }
    return customers;
  }

  const sortCombined = (customers, sortOrders) => {
    if (sortOrders.name === "sort-default" && sortOrders.status === "sort-default") return customers;

    let sortedByName = sortCustomersByName(customers, sortOrders);

    return sortCustomersByStatus(sortedByName, sortOrders);
  }

  const sortedCustomers = sortCombined(customersData, sort);
  const searchedCustomers = searchCustomers(sortedCustomers);
  const activeCustomersCount = customersData.filter(customer => customer.status === "active").length;
  const allCustomersCount = searchedCustomers.length;
  const customersReadyToRender = searchedCustomers.slice((currentPage - 1) * rowsPerPage, rowsPerPage * currentPage);


  if (customersReadyToRender.length === 0 && currentPage !== 1) {
    setCurrentPage(previous => previous - 1);
  }

  return (
    <div className="container">
      <Header
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setCurrentPage={setCurrentPage}
        sort={sort}
        setSort={setSort}
      />
      <Table
        customersData={customersData}
        customersReadyToRender={customersReadyToRender}
        setCustomersData={setCustomersData}
        sort={sort}
        setSort={setSort}
      />
      {customersReadyToRender.length === 0 ? null :
        <Footer
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          setCurrentPage={setCurrentPage}
          allCustomersCount={allCustomersCount}
          customersReadyToRender={customersReadyToRender}
          activeCustomersCount={activeCustomersCount}
        />
      }
    </div>
  );
}

export default Main;
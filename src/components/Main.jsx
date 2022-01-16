import Header from './Header/Header';
import Table from "./Table/Table";
import Footer from './Footer/Footer';
import customers from "../Customers";
import React, { useEffect, useState } from 'react';
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
  const [sortedCustomers, setSortedCustomers] = useState(customersData);
  const [searchedCustomers, setSearchedCustomers] = useState(customersData);
  const [customersToRender, setCustomersToRender] = useState(customersData);
  const [sort, setSort] = useState({ name: "sort-default", status: "sort-default" });

  const customersReadyToRender = customersToRender.slice((currentPage - 1) * rowsPerPage, rowsPerPage * currentPage);

  useEffect(() => {
    if (customersReadyToRender.length === 0 && currentPage !== 1) {
      setCurrentPage(previous => previous - 1);
    }
  }, [customersReadyToRender])

  useEffect(() => {
    setCustomersToRender(searchedCustomers);
  }, [searchedCustomers])

  return (
    <div className="container">
      <Header
        sortedCustomers={sortedCustomers}
        setSearchedCustomers={setSearchedCustomers}
        setCurrentPage={setCurrentPage}
        sort={sort}
        setSort={setSort}
      />
      <Table
        customersData={customersData}
        customersReadyToRender={customersReadyToRender}
        setSortedCustomers={setSortedCustomers}
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
          customersToRender={customersToRender}
          customersReadyToRender={customersReadyToRender}
        />
      }
    </div>
  );
}

export default Main;
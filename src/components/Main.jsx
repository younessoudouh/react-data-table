import Header from './Header/Header';
import Table from "./Table/Table";
import Footer from './Footer/Footer';
import customers from "../Customers";
import React, {useEffect, useState } from 'react';
import "../index.css"

function Main () {

useEffect(() => {
  (() => {
    if (JSON.parse(localStorage.getItem("customers")) === null) {
      localStorage.setItem("customers", JSON.stringify(customers));
    }
  })()
}, [])

const getCustomersFromLocalStorage = () => {
  return localStorage.getItem("customers") ? JSON.parse(localStorage.getItem("customers")) : [];
};

const [customersData,setCustomersData] = useState(() => getCustomersFromLocalStorage());
const [rowsPerPage,setRowsPerPage] = useState(5);
const [currentPage,SetCurrentPage] = useState(1);
// const [sortedCustomers,setSortedCustomers] = useState(customersData);
// const [searchedCustomers,setSearchedCustomers] = useState(sortedCustomers);
const [customersToRender,setCustomersToRender] = useState(customersData);

const customersReadyToRender = customersToRender.slice((currentPage - 1) * rowsPerPage, rowsPerPage * currentPage);

useEffect(() => {
  if(customersReadyToRender.length === 0 && currentPage !== 1) SetCurrentPage(previous => previous - 1);
},[customersReadyToRender])

// useEffect(() => {
//   setCustomersToRender(customersData);
// }, [customersData])

  return (
    <div className="container">
      <Header props={[customersData, setCustomersToRender, SetCurrentPage]}/>
      <Table props = {[customersData, customersReadyToRender, setCustomersToRender, setCustomersData]} />
      {customersReadyToRender.length === 0 ? null : <Footer props = {[currentPage,rowsPerPage,setRowsPerPage,SetCurrentPage,customersToRender,customersReadyToRender]}/>}
    </div>
  );
}

export default Main;
import Header from './Header/Header';
import Table from "./Table/Table";
import Footer from './Footer/Footer';
import customers from "../Customers";
import {useState } from 'react';
import "../index.css"

function Main () {

(() => {
    if (JSON.parse(localStorage.getItem("customers")) === null) {
        return localStorage.setItem("customers", JSON.stringify(customers));
    }
})();

const getCustomersFromLocalStorage = () => {
  return localStorage.getItem("customers") ? JSON.parse(localStorage.getItem("customers")) : [];
};

const [customersData,setCustomersData] = useState(() => getCustomersFromLocalStorage());
const [rowsPerPage,setRowsPerPage] = useState(5);
const [currentPage,SetCurrentPage] = useState(1);
const [customersToRender,setCustomersToRender] = useState(customersData);


const customersReadyToRender = customersToRender.slice((currentPage - 1) * rowsPerPage, rowsPerPage * currentPage);

  return (
    <div className="container">
      <Header customers={[customersData,setCustomersToRender,SetCurrentPage]}/>
      <Table customers = {[customersReadyToRender ,customersToRender, setCustomersData]} />
      {customersReadyToRender.length === 0 ? null : <Footer data = {[currentPage,rowsPerPage,setRowsPerPage,SetCurrentPage,customersToRender,customersReadyToRender]}/>}
    </div>
  );
}

export default Main;
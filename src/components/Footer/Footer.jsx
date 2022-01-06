import React,{useEffect, useState} from "react";
import "./Footer.css";

const Footer = ({props}) => {

let  [currentPage,rowsPerPage,setRowsPerPage,SetCurrentPage,customersToRender,customersReadyToRender] = props;

const countActiveCustomers = (customersList) => {
    return customersList.filter(customer=>customer.status==="active").length;
}  

const [activeCustomers,setActiveCustomers] = useState(countActiveCustomers(customersToRender));

const handleChange = (e) => {
    SetCurrentPage(1);
    setRowsPerPage(parseInt(e.target.value));
};

const handlePreviousPage = () => {
    SetCurrentPage(previous => previous > 1 ? previous-1 : previous);
};

const handleNextPage = () => {
    SetCurrentPage(previous => customersToRender.length > rowsPerPage * currentPage ? previous + 1 : previous);
};

useEffect(() => {
    setActiveCustomers(countActiveCustomers(customersToRender));
},[customersToRender])

    return (
        <footer>
            <div className="active-customers">
                active customers: <strong>{activeCustomers}</strong> / <small>{customersToRender.length}</small>
            </div>
            <div className="right-side">
                <ul>
                    <li className="rows-page">
                        Rows per page:
                        <select onChange={handleChange}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                        </select>
                    </li>
                    <li id="displayed-customer">
                        {currentPage === 1 ? 1 : rowsPerPage * currentPage - rowsPerPage + 1} - {rowsPerPage * currentPage - (rowsPerPage - customersReadyToRender.length)} of  {customersToRender.length}
                    </li>
                    <li>
                        <i className="fas fa-chevron-left" onClick={handlePreviousPage}></i>
                        <i className="fas fa-chevron-right" onClick={handleNextPage}></i>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;
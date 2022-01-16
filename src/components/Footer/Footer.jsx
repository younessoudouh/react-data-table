import React, { useEffect, useState } from "react";
import "./Footer.css";
import Select from "../Select/Select";

const Footer = ({ currentPage, rowsPerPage, setRowsPerPage, setCurrentPage, customersToRender, customersReadyToRender }) => {
    const countActiveCustomers = (customersList) => {
        return customersList.filter(customer => customer.status === "active").length;
    }

    const [activeCustomers, setActiveCustomers] = useState(countActiveCustomers(customersToRender));
    const [slectedValue, setSlectedValue] = useState(10)

    const handleChange = (e) => {
        const rows = parseInt(e.target.value);
        setSlectedValue(rows)
        setCurrentPage(1);
        setRowsPerPage(rows);
    };

    const handlePreviousPage = () => {
        setCurrentPage(previous => previous > 1 ? previous - 1 : previous);
    };

    const handleNextPage = () => {
        setCurrentPage(previous => customersToRender.length > rowsPerPage * currentPage ? previous + 1 : previous);
    };

    useEffect(() => {
        setActiveCustomers(countActiveCustomers(customersToRender));
    }, [customersToRender])

    return (
        <footer>
            <div className="active-customers">
                active customers:
                {` `}
                <strong>{activeCustomers}</strong>
                {` `} / {` `}
                <small>{customersToRender.length}</small>
            </div>
            <div className="right-side">
                <ul>
                    <li className="rows-page">
                        Rows per page:
                        <Select
                            options={[5, 10, 15, 20, 25]}
                            slectedValue={slectedValue}
                            chanchHandler={handleChange}
                        />
                    </li>
                    <li id="displayed-customer">
                        {
                            `${currentPage === 1 ? 1 : rowsPerPage * currentPage - rowsPerPage + 1} 
                            -
                            ${rowsPerPage * currentPage - (rowsPerPage - customersReadyToRender.length)}
                            of 
                            ${customersToRender.length}`
                        }
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
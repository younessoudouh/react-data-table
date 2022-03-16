import React from "react";
import "./Footer.css";
import Select from "../Select/Select";

const Footer = ({
  currentPage,
  rowsPerPage,
  setRowsPerPage,
  setCurrentPage,
  allCustomersCount,
  customersReadyToRender,
  activeCustomersCount,
  customersData
}) => {
  const handleRowsChange = (e) => {
    const rows = parseInt(e.target.value);
    setCurrentPage(1);
    setRowsPerPage(rows);
  };

  const handlePreviousPage = () => {
    setCurrentPage((previous) => (previous > 1 ? previous - 1 : previous));
  };

  const handleNextPage = () => {
    setCurrentPage((previous) =>
      allCustomersCount > rowsPerPage * currentPage ? previous + 1 : previous
    );
  };

  return (
    <footer>
      <div className="active-customers">
        active customers:
        {` `}
        <strong>{activeCustomersCount}</strong>
        {` `} / {` `}
        <small>{customersData.length}</small>
      </div>
      <div className="right-side">
        <ul>
          <li className="rows-page">
            Rows per page:
            <Select
              value={rowsPerPage}
              onChange={handleRowsChange}
              className={"select-rows"}
              options={[5, 10, 15, 20, 25]}
            />
          </li>
          <li>
            {`${
              currentPage === 1
                ? 1
                : rowsPerPage * currentPage - rowsPerPage + 1
            }
            -
             ${
               rowsPerPage * currentPage -
               (rowsPerPage - customersReadyToRender.length)
             }
            of 
            ${allCustomersCount}`}
          </li>
          <li>
            <i className="fas fa-chevron-left" onClick={handlePreviousPage}></i>
            <i className="fas fa-chevron-right" onClick={handleNextPage}></i>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

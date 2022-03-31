import React, { memo, useCallback, useContext } from "react";
import "./Footer.css";
import Select from "../Select/Select";
import { globalContext } from "../../Hooks/GlobalContext";

const options = [5, 10, 15, 20, 25];

const Footer = ({
  rowsPerPage,
  setRowsPerPage,
  allCustomersCount,
  customersReadyToRender,
  customersData,
}) => {
  const handleRowsChange = useCallback((e) => {
    const rows = parseInt(e.target.value);
    setCurrentPage(1);
    setRowsPerPage(rows);
  }, []);

  const activeCustomersCount = () => {
    return customersData.filter((customer) => customer.status === "active")
      .length;
  };

  const { currentPage, setCurrentPage } = useContext(globalContext);

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
        <strong>{activeCustomersCount()}</strong>
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
              options={options}
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

export default memo(Footer);

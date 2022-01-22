import React from "react";
import "./Select.css";

const Select = ({ rowsPerPage, chanchHandler, options }) => {
    return (
        <select value={rowsPerPage} onChange={chanchHandler}>
            {options.map((option, index) => <option key={index} value={option}>{option}</option>)}
        </select>
    )
}

export default Select;
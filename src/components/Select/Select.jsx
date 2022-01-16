import React from "react";
import "./Select.css";

const Select = ({ slectedValue, chanchHandler, options }) => {
    return (
        <select value={slectedValue} onChange={chanchHandler}>
            {options.map((option, index) => <option key={index} value={option}>{option}</option>)}
        </select>
    )
}

export default Select;
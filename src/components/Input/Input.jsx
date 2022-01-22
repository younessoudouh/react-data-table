import React from "react";

const Input = ({ htmlFor, id, type, value, changeHandler, checked, text }) => {
    return (
        <div className="sort-option">
            <label htmlFor={htmlFor} className="sort-label">{text}</label>
            <input className="sort-input" type={type} id={id} value={value} onChange={changeHandler} checked={checked} />
        </div>
    )
}

export default Input;
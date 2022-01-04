import React from "react";
import "./CustomerRow.css";
import Button from "../Button/Button";

const CustomerRow = ({customer:{ firstName, lastName, description, rate, balance, deposit, status, id, currency },clickHandler}) => {
    return (
        <tr>
            <td className="relative">
                <input type="checkbox" className="check"/>
            </td>
            <td>
                <h5 className="customer-name">{firstName} {lastName}</h5>
                <div className="customer-id">{id}</div>
            </td>
            <td>
                <p className="description">{description}</p>
            </td>
            <td>
                <h3 className="rate-number">{rate}</h3>
                <h4 className="inr">{currency}</h4>
            </td>
            <td>
                <h3 className={balance>0?"positive":"negative"}>{balance}</h3>
                <h4 className="inr">{currency}</h4>
            </td>
            <td>
                <h3 className="deposite-number">{deposit}</h3>
                <h4 className="inr">{currency}</h4>
            </td>
            <td className="status">
                <Button className={status}>{status}</Button>
            </td>
            <td>
                <div className="flex">
                    <i className="fas fa-pen"></i>
                    <Button clickHandler = {clickHandler} className = "trash">
                        <i className="far fa-trash-alt"></i>
                    </Button>
                    <i className="fas fa-ellipsis-v" ></i>
                </div>
            </td>    
        </tr>
  );
}

export default CustomerRow;
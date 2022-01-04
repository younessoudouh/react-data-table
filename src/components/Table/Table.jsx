import React, { useEffect, useState } from "react";
import "./Table.css";
import CustomerRow from "../CustomerRow/CustomerRow";

const Table = ({customers}) => {

let [customersReadyToRender ,customersToRender ,setCustomersData] = customers;

const [isdeleted,setIsDeleted] = useState(false);

const setCustomersInLocalStorage = (customesList) => localStorage.setItem("customers", JSON.stringify(customesList));

const deletCustomer = (customerId ,customers) => {
    if (window.confirm("are you sure")) {
        setCustomersData(customers.filter(customer => customer.id != customerId));
        setIsDeleted(!isdeleted)
    }
}

useEffect(() => {
    setCustomersInLocalStorage(customersToRender);
},[isdeleted])

    return (
        <table>
            <thead>
                <tr>
                    <th><input type="checkbox"/></th>
                    <th className="sorting name-field">name</th>
                    <th> description</th>
                    <th>rate</th>
                    <th>balance</th>
                    <th>deposit</th>
                    <th className="sorting">status</th>
                    <th>
                        <i className="fas fa-ellipsis-h"></i>
                    </th>
                </tr>
            </thead>
            <tbody>
                {customersReadyToRender.map(customer=>(<CustomerRow key={customer.id} clickHandler={() => deletCustomer(customer.id,customersToRender)} customer={customer}/>))}
            </tbody>
        </table>
  );
}

export default Table;
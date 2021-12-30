import React from "react";
import "./Table.css";
import CustomerRow from "./CustomerRow";

function Table({customers}) {
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
        {customers.map(customer=>(<CustomerRow key={customer.id} customer={customer}/>))}
    </tbody>
</table>
  );
}

export default Table;
import React, {useState, useEffect} from "react";
import "./Table.css";
import CustomerRow from "../CustomerRow/CustomerRow";

const Table = ({props}) => {

let [customersData, customersReadyToRender, setCustomersToRender, setCustomersData] = props;
const [sortByName, setSortByName] = useState("sort-default");
const [sortByStatus, setSortByStatus] = useState("sort-default");

const setCustomersInLocalStorage = (customesList) => localStorage.setItem("customers", JSON.stringify(customesList));

const deletCustomer = (customerId ,customers) => {
    if (window.confirm("are you sure")) {
        setCustomersData(customers.filter(customer => customer.id !== customerId));
        setCustomersInLocalStorage(customers.filter(customer => customer.id !== customerId));
    }
}

const handleStatusClick = () => {
    if(sortByStatus === "sort-default"){
        setSortByStatus("sort-asc");
    }else if(sortByStatus === "sort-asc"){
        setSortByStatus("sort-desc");
    }else{
        setSortByStatus("sort-default");
    }
}

const handleNameClick = () => {
    if(sortByName === "sort-default"){
        setSortByName("sort-asc");
    }else if(sortByName === "sort-asc"){
        setSortByName("sort-desc");
    }else{
        setSortByName("sort-default");
    }
}

const sortCustomersByName = (customers, sortOrder) => {
    let customersToSort = customers.slice();

    if (sortOrder === "sort-asc") {
        return customersToSort.sort((customer1, customer2) => (customer1.firstName > customer2.firstName) ? 1 : -1);
    }

    if (sortOrder === "sort-desc") {
        return customersToSort.sort((customer1, customer2) => (customer1.firstName > customer2.firstName) ? -1 : 1);
    }

    return customersToSort;
}

useEffect(() => {
    setCustomersToRender(sortCustomersByName(customersData,sortByName));
}, [sortByName])

    return (
        <table>
            <thead>
                <tr>
                    <th><input type = "checkbox"/></th>
                    <th className = {`name-field ${sortByName}`} onClick = {handleNameClick}>name</th>
                    <th> description</th>
                    <th>rate</th>
                    <th>balance</th>
                    <th>deposit</th>
                    <th className = {`status ${sortByStatus}`} onClick = {handleStatusClick}>status</th>
                    <th>
                        <i className="fas fa-ellipsis-h"></i>
                    </th>
                </tr>
            </thead>
            <tbody>
                {customersReadyToRender.map(customer=>(<CustomerRow key={customer.id} clickHandler={() => deletCustomer(customer.id, customersData)} customer={customer}/>))}
            </tbody>
        </table>
  );
}

export default Table;
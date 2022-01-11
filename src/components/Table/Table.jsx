import React, {useState, useEffect} from "react";
import "./Table.css";
import CustomerRow from "../CustomerRow/CustomerRow";

const Table = ({ customersData, customersReadyToRender, setSortedCustomers, setCustomersData}) => {
    const [sort, setSort] = useState({name:"sort-default", status:"sort-default"});

    const setCustomersInLocalStorage = (customersList) => localStorage.setItem("customers", JSON.stringify(customersList));

    const deletCustomer = (customerId, customers) => {
        if (window.confirm("are you sure")) {
            setCustomersData(customers.filter(customer => customer.id !== customerId));
            setCustomersInLocalStorage(customers.filter(customer => customer.id !== customerId));
        }
    }

    const handleStatusClick = () => {
        if(sort.status === "sort-default"){
            setSort({name:"sort-default", status:"sort-asc"});
        }else if(sort.status === "sort-asc"){
            setSort({name:"sort-default", status:"sort-desc"});
        }else{
            setSort({name:"sort-default", status:"sort-default"});
        }
    }

    const handleNameClick = () => {
        if(sort.name === "sort-default"){
            setSort({name:"sort-asc", status:"sort-default"});
        }else if(sort.name === "sort-asc"){
            setSort({name:"sort-desc", status:"sort-default"});
        }else{
            setSort({name:"sort-default", status:"sort-default"});
        }
    }

    const sortCustomersByName = (customers, sortOrder) => {
        let customersToSort = customers.slice();

        if (sortOrder.name === "sort-asc") {
            return customersToSort.sort((customer1, customer2) => (customer1.firstName > customer2.firstName) ? 1 : -1);
        }

        if (sortOrder.name === "sort-desc") {
            return customersToSort.sort((customer1, customer2) => (customer1.firstName > customer2.firstName) ? -1 : 1);
        }

        return customersToSort;
    }

    const sortCustomersByStatus = (customers, sortOrder) => {
        if (sortOrder.status === "sort-asc") {
            return (customers.filter((customer) => customer.status === "active"))
                .concat(customers.filter((customer) => customer.status === "inactive"))
        }
    
        if (sortOrder.status === "sort-desc") {
            return (customers.filter((customer) => customer.status === "inactive"))
                .concat(customers.filter((customer) => customer.status === "active"))
        }
        return customers;
    }

    useEffect(() => {
        if(sort.name !== "sort-default"){
            setSortedCustomers(sortCustomersByName(customersData,sort));
        }else if(sort.status !== "sort-default"){
            setSortedCustomers(sortCustomersByStatus(customersData,sort));
        }else{
            setSortedCustomers(sortCustomersByStatus(customersData,sort));
        }
    }, [sort, customersData])


    return (
        <table>
            <thead>
                <tr>
                    <th><input type = "checkbox"/></th>
                    <th className = {`name-field ${sort.name}`} onClick = {handleNameClick}>name</th>
                    <th> description</th>
                    <th>rate</th>
                    <th>balance</th>
                    <th>deposit</th>
                    <th className = {`status ${sort.status}`} onClick = {handleStatusClick}>status</th>
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
import React, { useEffect } from "react";
import "./Table.css";
import CustomerRow from "../CustomerRow/CustomerRow";

const Table = ({ customersData, customersReadyToRender, setSortedCustomers, setCustomersData, sort, setSort }) => {
    const setCustomersInLocalStorage = (customersList) => localStorage.setItem("customers", JSON.stringify(customersList));

    const deletCustomer = (customerId, customers) => {
        if (window.confirm("are you sure")) {
            setCustomersData(customers.filter(customer => customer.id !== customerId));
            setCustomersInLocalStorage(customers.filter(customer => customer.id !== customerId));
        }
    }

    const handleStatusClick = () => {
        if (sort.status === "sort-default") {
            setSort(prev => prev = { ...prev, status: "sort-active" });
        } else if (sort.status === "sort-active") {
            setSort(prev => prev = { ...prev, status: "sort-inactive" });
        } else {
            setSort(prev => prev = { ...prev, status: "sort-default" });
        }
    }

    const handleNameClick = () => {
        if (sort.name === "sort-default") {
            setSort(prev => prev = { ...prev, name: "sort-asc" });
        } else if (sort.name === "sort-asc") {
            setSort(prev => prev = { ...prev, name: "sort-desc" });
        } else {
            setSort(prev => prev = { ...prev, name: "sort-default" });
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
        if (sortOrder.status === "sort-active") {
            return (customers.filter((customer) => customer.status === "active"))
                .concat(customers.filter((customer) => customer.status === "inactive"))
        }

        if (sortOrder.status === "sort-inactive") {
            return (customers.filter((customer) => customer.status === "inactive"))
                .concat(customers.filter((customer) => customer.status === "active"))
        }
        return customers;
    }

    const sortCombined = (customers, sortOrders) => {
        if (sortOrders.name === "sort-default" && sortOrders.status === "sort-default") return customers;

        let sortedByName = sortCustomersByName(customers, sortOrders);

        return sortCustomersByStatus(sortedByName, sortOrders);
    }

    useEffect(() => {
        setSortedCustomers(sortCombined(customersData, sort));
    }, [sort, customersData])

    return (
        <table>
            <thead>
                <tr>
                    <th><input type="checkbox" /></th>
                    <th className={`name-field ${sort.name}`} onClick={handleNameClick}>name</th>
                    <th> description</th>
                    <th>rate</th>
                    <th>balance</th>
                    <th>deposit</th>
                    <th className={`status ${sort.status}`} onClick={handleStatusClick}>status</th>
                    <th>
                        <i className="fas fa-ellipsis-h"></i>
                    </th>
                </tr>
            </thead>
            <tbody>
                {customersReadyToRender.map(customer => (<CustomerRow key={customer.id} clickHandler={() => deletCustomer(customer.id, customersData)} {...customer} />))}
            </tbody>
        </table>
    );
}

export default Table;
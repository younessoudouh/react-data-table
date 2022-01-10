import React, { useEffect, useState } from "react";
import "./Search.css";

const Search = ({props}) => {

let [sortedCustomers, setSearchedCustomers, SetCurrentPage] = props;

const [searchValue,setSearchValue] = useState("");

const searchCustomers = customersToSearchIn => {
    let valueToSearch = searchValue.toLowerCase();
    let searchedCustomers = customersToSearchIn.filter(customer => {
        return (customer.firstName.toLowerCase().includes(valueToSearch) || customer.lastName.toLowerCase().includes(valueToSearch) || customer.description.toLowerCase().includes(valueToSearch) || customer.id.toString().includes(valueToSearch)) ;
    })
    
    return searchedCustomers;
}

const handleChange = (e) => {
    setSearchValue(e.target.value);
    SetCurrentPage(1);
}

useEffect(() => {
    setSearchedCustomers(searchCustomers(sortedCustomers));
},[searchValue,sortedCustomers])

    return(
        <div className="search">
            <i className="fas fa-search"></i>
            <input type="text" className="search-input"  placeholder="Search" onChange={handleChange}/>
        </div>
    )
}

export default Search;
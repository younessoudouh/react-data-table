import React, { useEffect, useState } from "react";
import "./Search.css";

const Search = ({props}) => {

let [customersData, setCustomersToRender, SetCurrentPage] = props;

const [searchValue,setSearchValue] = useState("");

const searchCustomers = customersToSearchIn => {
    let valueToSearch = searchValue.toLowerCase();
    let searchedCustomers = customersToSearchIn.filter(customer => {
        return (customer.firstName.toLowerCase()).includes(valueToSearch) || customer.lastName.toLowerCase().includes(valueToSearch) || customer.description.toLowerCase().includes(valueToSearch);
    })
    
    return searchedCustomers;
}

const handleChange = (e) => {
    setSearchValue(e.target.value);
    SetCurrentPage(1);
}

useEffect(() => {
    setCustomersToRender(searchCustomers(customersData));
},[searchValue])

    return(
        <div className="search">
            <i className="fas fa-search"></i>
            <input type="text" className="search-input"  placeholder="Search" onChange={handleChange}/>
        </div>
    )
}

export default Search;
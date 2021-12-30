import React from "react";
import Search from "./Search";
import Button from "./Button";
// import Filter from "./Filter";

const Header=()=>{
    return(
        <header>
            <Search/>
            <Button className="add active">
                <i className="fas fa-plus-circle"></i>
                Add Customer
            </Button>
        </header>
    )
}

export default Header;
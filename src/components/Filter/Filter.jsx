import React,{useState} from "react";
import FilterModule from "../FilterModule/FilterModule"
import "./Filter.css";

const Filter =()=>{
    const [clicked,setClicked]=useState(false);

    const handleClick =()=> setClicked(!clicked);

    return(
        <div className="filter">
            <img src="/images/filter-icon.png" alt="filter" className="img-filter" onClick={handleClick}/>
                {clicked ? <FilterModule/> : null}
        </div>
    )
}

export default Filter;
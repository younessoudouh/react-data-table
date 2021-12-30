import React from "react";
import { useState } from "react/cjs/react.development";
import "./Filter.css";

const Filter =()=>{
    const [click,setClick]=useState(false);
    const [checked,setChecked]=useState("Default");

    const handleClick =()=> setClick(!click);
    const handleChange=(e)=>{
        console.log(e.target.value)
        setChecked(e.target.value);
    }

    return(
        <div className="filter">
            <img src="/images/filter-icon.png" alt="filter" className="img-filter" onClick={handleClick}/>
                <div className={click?"sort":"sort hide"}>
                    <div className="sort-by-name">
                        <h3 className="sort-head">sort by:</h3>
                        <div className="option-sort option">
                            <label htmlFor="sort-default">Default</label>
                            <input type="radio" name="op" id="sort-default" value="Default" onChange={handleChange} checked={checked==="Default"}/>
                        </div>
                        <div className="option-sort option">
                            <label htmlFor="sort-first-name">Ascending</label>
                            <input type="radio" name="op" id="sort-first-name" value="asc" onChange={handleChange} checked={checked==="asc"}/>
                        </div>
                        <div className="option-sort option">
                            <label htmlFor="sort-last-name">Descending</label>
                            <input type="radio" name="op" id="sort-last-name" value="desc" onChange={handleChange} checked={checked==="desc"}/>
                        </div>
                    </div>
                    <div className="sort-by-status">
                        <h3 className="sort-head">Users:</h3>
                        <div className="option-sort option">
                            <label htmlFor="sort-All">All</label>
                            <input type="radio" name="user" id="sort-All" value="all" controled="true"/>
                        </div>
                        <div className="option-sort option">
                            <label htmlFor="sort-Active">Active</label>
                            <input type="radio" name="user" id="sort-Active" value="active" controled="true"/>
                        </div>
                        <div className="option-sort option">
                            <label htmlFor="sort-inactive">Inactive</label>
                            <input type="radio" name="user" id="sort-inactive" value="inactive" controled="true"/>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Filter;
import React from "react";
import "./Footer.css";

const Footer =({activeCustomers,length})=>{

    return (
        <footer>
            <div className="active-customers">active customers: <strong>{activeCustomers}</strong> / <small>{length-1}</small> </div>
            <div className="right-side">
                <ul>
                    <li className="rows-page">Rows per page:
                        <select>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                        </select>
                    </li>
                    <li id="displayed-customer">1-{length-1} of {length-1}</li>
                    <li><i className="fas fa-chevron-left"></i><i className="fas fa-chevron-right"></i></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;
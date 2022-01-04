import React from "react";
import "./Button.css";

const Button = ({children,className ,clickHandler}) => {
    return(
        <button className={className} onClick={clickHandler}>
                {children}
        </button> 
    )
}

export default Button;
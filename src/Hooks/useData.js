import { useState, useEffect } from "react";
import customers from "../Customers";

const useData = () => {
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("customers")) === null) {
      localStorage.setItem("customers", JSON.stringify(customers));
    }
  }, []);

  const getCustomersFromLocalStorage = () => {
    return localStorage.getItem("customers")
      ? JSON.parse(localStorage.getItem("customers"))
      : [];
  };

  const [customersData, setCustomersData] = useState(() =>
    getCustomersFromLocalStorage()
  );

  return [customersData, setCustomersData];
};

export default useData;

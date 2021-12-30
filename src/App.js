import './index.css';
import Header from './components/Header';
import Table from "./components/Table";
import Footer from './components/Footer';
import customers from "./Customers";
import { useEffect, useState } from 'react';

function App() {

  const [customersData,setCustomersData]=useState(customers);

  const countActiveCustomers=(customersList)=>{
    return customersList.filter(customer=>customer.status==="active").length;
  }
  
  const [activeCustomers,setActiveCustomers]=useState();

  useEffect(()=>{
    setActiveCustomers(countActiveCustomers(customers))
  },[customersData])

  return (
    <div className="container">
      <Header/>
      <Table customers={customers} />
      <Footer activeCustomers={activeCustomers} length={customers.length}/>
    </div>
  );
}

export default App;

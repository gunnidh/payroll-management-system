import React from "react";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Employee from "./Employee";
import EmployeePaySlip from "./EmployeePaySlip";
import Home from "./Home";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";
import Start from "./Start";
import EmployeeDetail from "./EmployeeDetail";
import EmployeeLogin from "./EmployeeLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="" element={<Home />}></Route>
          <Route path="/employee" element={<Employee />}></Route>
          <Route path="/create" element={<AddEmployee />}></Route>
          <Route path="/employeeEdit/:id" element={<EditEmployee />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/start" element={<Start />}></Route>
        <Route path="/employeeLogin" element={<EmployeeLogin />}></Route>
        <Route path="/employeeDetail/:id" element={<EmployeeDetail />}></Route>
        <Route path="/employeePaySlip/:id" element={<EmployeePaySlip />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

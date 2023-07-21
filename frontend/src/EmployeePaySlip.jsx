import axios from "axios";
import React, { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";

function EmployeePaySlip() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/get/" + id)
      .then((res) => setEmployee(res.data.Result[0]))
      .catch((err) => console.log(err));
  });

  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const d = new Date();
  let name = month[d.getMonth()];

//   const handleLogout = () => {
//     axios
//       .get("http://localhost:8081/logout")
//       .then((res) => {
//         navigate("/start");
//       })
//       .catch((err) => console.log(err));
//   };

  return (
    <div>
      <div className="d-flex justify-content-center flex-column align-items-center mt-3">
        <h2>
        Salary slip of currunt month : {name}
        </h2>
      </div>

      <table className="table table-hover ">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Employee ID:</th>
            <td>{employee.id}</td>
          </tr>
          <tr>
            <th scope="row">Name:</th>
            <td>{employee.name}</td>
          </tr>
          <tr>
            <th scope="row">Email:</th>
            <td colSpan="2">{employee.email}</td>
          </tr>
          <tr>
            <th scope="row">Address:</th>
            <td colSpan="2">{employee.address}</td>
          </tr>
          <tr>
            <th scope="row">Salary:</th>
            <td colSpan="2">₹ {employee.salary/12}</td>
          </tr>
          <tr>
            <th scope="row">Designation:</th>
            <td colSpan="2">{employee.designation}</td>
          </tr>
          <tr>
            <th scope="row">HRA:</th>
            <td colSpan="2">₹ {(employee.houseRentAllowance/12).toFixed(2)}</td>
          </tr>
          <tr>
            <th scope="row">DA:</th>
            <td colSpan="2">₹ {(employee.dearnessAllowance/12).toFixed(2)}</td>
          </tr>
          <tr>
            <th scope="row">TA:</th>
            <td colSpan="2">₹ {(employee.travelAllowance/12).toFixed(2)}</td>
          </tr>
          <tr>
            <th scope="row">PF:</th>
            <td colSpan="2">₹ {(employee.providentFund/12).toFixed(2)}</td>
          </tr>
          <tr>
            <th scope="row">Pension Fund:</th>
            <td colSpan="2">₹ {(employee.pensionFund/12).toFixed(2)}</td>
          </tr>
          <tr>
            <th scope="row">Gross Salary:</th>
            <td colSpan="2">₹ {(employee.grossSalary/12).toFixed(2)}</td>
          </tr>
          <tr>
            <th scope="row">Net Salary:</th>
            <td colSpan="2">₹ {(employee.netSalary/12).toFixed(2)}</td>
          </tr>
          <tr>
          <th scope="row">Salary credited to Bank Account:</th>
          <td colSpan="2">{employee.bankAccount}</td>
        </tr>
        <tr>
          <th scope="row">PAN associated with deduction:</th>
          <td colSpan="2">{employee.panNumber}</td>
        </tr>
        </tbody>
      </table>

      {/* <div>
        <handelBack/>
      </div> */}
      
    </div>
  );
}

export default EmployeePaySlip;

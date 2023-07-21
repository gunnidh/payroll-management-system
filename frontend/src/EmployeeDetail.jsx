import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/get/" + id)
      .then((res) => setEmployee(res.data.Result[0]))
      .catch((err) => console.log(err));
  });

  const handleLogout = () => {
    axios
      .get("http://localhost:8081/logout")
      .then((res) => {
        navigate("/start");
      })
      .catch((err) => console.log(err));
  };

  function handelBack() {
      axios.get('http://localhost:8081/dashboard')
      .then(res => {
        if (res.data.Status === "Success"){
          navigate("/employee");
        }
      }).catch(err => console.log(err));

      return (
        <button
          onClick={(e) => handleLogout()}
          className="btn btn-warning btn-sm me-2"
        >
        Navigate Back
        </button>
      );
    }

  return (
    <div>
      <div className="d-flex justify-content-center flex-column align-items-center mt-3">
        <img
          src={`http://localhost:8081/images/` + employee.image}
          alt=""
          className="empImg"
        />
      </div>

      <table className="table table-hover">
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
            <td colspan="2">{employee.email}</td>
          </tr>
          <tr>
            <th scope="row">Address:</th>
            <td colspan="2">{employee.address}</td>
          </tr>
          <tr>
            <th scope="row">Salary:</th>
            <td colspan="2">₹ {employee.salary}</td>
          </tr>
          <tr>
            <th scope="row">Designation:</th>
            <td colspan="2">{employee.designation}</td>
          </tr>
          <tr>
            <th scope="row">HRA:</th>
            <td colspan="2">₹ {employee.houseRentAllowance}</td>
          </tr>
          <tr>
            <th scope="row">DA:</th>
            <td colspan="2">₹ {employee.dearnessAllowance}</td>
          </tr>
          <tr>
            <th scope="row">TA:</th>
            <td colspan="2">₹ {employee.travelAllowance}</td>
          </tr>
          <tr>
            <th scope="row">PF:</th>
            <td colspan="2">₹ {employee.providentFund}</td>
          </tr>
          <tr>
            <th scope="row">Pension Fund:</th>
            <td colspan="2">₹ {employee.pensionFund}</td>
          </tr>
          <tr>
            <th scope="row">Gross Salary:</th>
            <td colspan="2">₹ {employee.grossSalary}</td>
          </tr>
          <tr>
            <th scope="row">Net Salary:</th>
            <td colspan="2">₹ {employee.netSalary}</td>
          </tr>
          <tr>
            <th scope="row">Bonus Amount:</th>
            <td colspan="2">₹ {employee.bonusAmount}</td>
          </tr>
        </tbody>
      </table>

      <div>
        <handelBack/>
      </div>
      
    </div>
  );
}

export default EmployeeDetail;

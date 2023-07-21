import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8081/get/" + id)
      .then((res) => setEmployee(res.data.Result[0]))
      .catch((err) => console.log(err));

    axios.get("http://localhost:8081/dashboard")
      .then((res) => {
        if (res.data.Status === "Success")
          setIsAdmin(1);
        else
          setIsAdmin(0);
      })
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

  // function HandelBack() {
  //   if (isAdmin === 1) {
  //     return (
  //         <Link
  //           to={`/employee/` + employee.id}
  //           className="btn btn-success btn-sm me-2"
  //           >
  //           Navigate Back
  //           </Link>
  //     );
  //   }
  //   else {
  //     return (
  //       <button
  //         onClick={(e) => handleLogout()}
  //         className="btn btn-warning btn-sm me-2"
  //       >
  //         {" "}
  //         Logout
  //       </button>
  //     );
  //   }
  // }


return (
  <div>
    <div className="d-flex justify-content-center flex-column align-items-center mt-3">
      <img
        src={`http://localhost:8081/images/` + employee.image}
        alt=""
        className="empImg"
      />
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
          <th scope="row">Designation:</th>
          <td colSpan="2">{employee.designation}</td>
        </tr>
        <tr>
          <th scope="row">Bank Account:</th>
          <td colSpan="2">{employee.bankAccount}</td>
        </tr>
        <tr>
          <th scope="row">Bank Name:</th>
          <td colSpan="2">{employee.bankName}</td>
        </tr>
        <tr>
          <th scope="row">Bank IFSC:</th>
          <td colSpan="2">{employee.bankIfsc}</td>
        </tr>
        <tr>
          <th scope="row">PAN Number:</th>
          <td colSpan="2">{employee.panNumber}</td>
        </tr>
        <tr>
            <th scope="row">Bonus Amount per annum:</th>
            <td colspan="2">₹ {employee.bonusAmount}</td>
          </tr>
        <tr>
          <th scope="row">Salary per annum:</th>
          <td colSpan="2">₹ {employee.salary}</td>
        </tr>
      </tbody>
    </table>

    <Link
      to={`/employeePaySlip/` + employee.id}
      className="btn btn-primary btn-sm me-2"
    >
      Pay Slip
    </Link>
    {/* <HandelBack /> */}
  </div>
);
}

export default EmployeeDetail;

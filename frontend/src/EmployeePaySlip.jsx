import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EmployeePaySlip() {
  const { id } = useParams();
  const [data, setEmployee] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/get/" + id)
      .then((res) => {
        console.log(res.data.Result[0]);
        setEmployee(res.data.Result);
      })
      .catch((err) => console.log(err));
  });

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };

  return (
    <div className="justify-content-center ">
      {data.map((employee, index) => {
        return (
          <div key={index} id="salary_plip">
            <div className="d-flex flex-column mt-3">
              <h2>
                Salary-slip created on{" "}
                {new Date(employee.creationTime).toLocaleString(
                  "en-US",
                  options
                )}
              </h2>
            </div>
            <div className="mt-3">
              <table className="table table-bordered">
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
                  <th scope="row">First Name:</th>
                  <td>{employee.firstName}</td>
                  </tr>
                  <tr>
                  <th scope="row">Last Name:</th>
                  <td>{employee.lastName}</td>
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
                    <td colSpan="2">₹ {(employee.salary / 12).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <th scope="row">Designation:</th>
                    <td colSpan="2">{employee.designation}</td>
                  </tr>
                  <tr>
                    <th scope="row">HRA:</th>
                    <td colSpan="2">
                      ₹ {(employee.houseRentAllowance / 12).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">DA:</th>
                    <td colSpan="2">
                      ₹ {(employee.dearnessAllowance / 12).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">TA:</th>
                    <td colSpan="2">
                      ₹ {(employee.travelAllowance / 12).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">PF:</th>
                    <td colSpan="2">
                      ₹ {(employee.providentFund / 12).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Pension Fund:</th>
                    <td colSpan="2">
                      ₹ {(employee.pensionFund / 12).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Gross Salary:</th>
                    <td colSpan="2">
                      ₹ {(employee.grossSalary / 12).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Net Salary:</th>
                    <td colSpan="2">
                      ₹ {(employee.netSalary / 12).toFixed(2)}
                    </td>
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
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default EmployeePaySlip;

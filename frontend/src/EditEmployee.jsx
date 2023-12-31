import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditEmployee() {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const [data, setData] = useState({
    id: "",
    image: "",
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    departmentId:"",
    address: "",
    designation: "",
    salary: "",
    bonusAmount:"",
    rollOutMonth:"",
  });
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:8081/get/" + id)
      .then((res) => {
        setData({
          ...data,
          id: res.data.Result[0].id,
          image: res.data.Result[0].image,
          firstName: res.data.Result[0].firstName,
          lastName: res.data.Result[0].lastName,
          email: res.data.Result[0].email,
          contactNumber: res.data.Result[0].contactNumber,
          departmentId: res.data.Result[0].departmentId,
          address: res.data.Result[0].address,
          salary: res.data.Result[0].salary,
          bonusAmount: res.data.Result[0].bonusAmount,
          designation: res.data.Result[0].designation,
          rollOutMonth: res.data.Result[0].rollOutMonth,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:8081/update/" + id, data)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/employee");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Update Employee Details</h2>
      <form className="row g-3 w-50" onSubmit={handleSubmit}>
        <div className="col-12">
          <br />
          {
            <img
              src={`http://localhost:8081/images/` + data.image}
              alt=""
              className="employee_image"
              style={{ height: 200 + "px", width: 150 + "px" }}
            />
          }
        </div>
        <div className="col-12">
          <label htmlFor="inputName" className="form-label">
            Name:{" "}
          </label>
          {" " + data.firstName + " " + data.lastName}
          {/* <input type="text" className="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
					onChange={e => setData({...data, name: e.target.value})} value={data.name}/> */}
        </div>
        <div className="col-12">
          <label htmlFor="inputName" className="form-label">
            Employee ID:
          </label>
          {" " + data.id}
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Address:
          </label>
          {" " + data.address}
        </div>
        <div className="col-12">
          <label htmlFor="inputEmail4" className="form-label">
            Email:
          </label>
          {" " + data.email}
        </div>
        <div className="col-12">
          <label htmlFor="inputContactNubmer" className="form-label">
            Contact Number:
          </label>
          <input
            type="number"
            className="form-control"
            id="inputContactNubmer"
            placeholder="Enter Contact Number:"
            autoComplete="off"
            onChange={(e) => setData({ ...data, contactNumber: e.target.value })}
            value={data.contactNumber}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputSalary" className="form-label">
            CTC per annum
          </label>
          <input
            type="number"
            className="form-control"
            id="inputSalary"
            placeholder="Enter Salary"
            autoComplete="off"
            onChange={(e) => setData({ ...data, salary: e.target.value })}
            value={data.salary}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputBonus" className="form-label">
            Bonus Amount
          </label>
          <input
            type="number"
            className="form-control"
            id="inputBonus"
            placeholder="Enter Bonus"
            autoComplete="off"
            onChange={(e) => setData({ ...data, bonusAmount: e.target.value })}
            value={data.bonusAmount}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputDesignation" className="form-label">
            Designation
          </label>
          <input
            type="text"
            className="form-control"
            id="inputDesignation"
            placeholder="Enter Designation"
            autoComplete="off"
            onChange={(e) => setData({ ...data, designation: e.target.value })}
            value={data.designation}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputDepartmentId" className="form-label">
          Department Id
          </label>
          <input
            type="text"
            className="form-control"
            id="inputDepartmentId"
            placeholder="Enter Department Id"
            autoComplete="off"
            onChange={(e) => setData({ ...data, departmentId: e.target.value })}
            value={data.departmentId}
          />
        </div>
        <div className="col-12">
        <label id="inputRollOuMonth" className="form-control">
            Select Current Month
          </label>
          <select value={data.rollOutMonth} onChange={(e) => setData({ ...data, rollOutMonth: e.target.value })}>
            {months.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditEmployee;

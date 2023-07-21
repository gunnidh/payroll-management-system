import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddEmployee() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    designation: "",
    salary: "",
    bonus: "",
    bankAccount: "",
    bankName: "",
    panNumber: "",
    bankIfsc: "",
    image: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("email", data.email);
    formdata.append("password", data.password);
    formdata.append("address", data.address);
    formdata.append("designation", data.designation);
    formdata.append("salary", data.salary);
    formdata.append("bonus", data.bonus);
    formdata.append("bankAccount", data.bankAccount);
    formdata.append("bankName", data.bankName);
    formdata.append("panNumber", data.panNumber);
    formdata.append("bankIfsc", data.bankIfsc);
    formdata.append("image", data.image);
    axios
      .post("http://localhost:8081/create", formdata)
      .then((res) => {
        navigate("/employee");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Add Employee</h2>
      <form className="row g-3 w-50" onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="inputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            placeholder="Enter Name"
            autoComplete="on"
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputEmail4" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail4"
            placeholder="Enter Email"
            autoComplete="on"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputPassword4" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword4"
            placeholder="Enter Password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputDesignation" className="form-label">
            Desigantion
          </label>
          <input
            type="text"
            className="form-control"
            id="inputDesignation"
            placeholder="Enter Designation"
            autoComplete="on"
            onChange={(e) => setData({ ...data, designation: e.target.value })}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputSalary" className="form-label">
            Salary
          </label>
          <input
            type="number"
            className="form-control"
            id="inputSalary"
            placeholder="Enter Salary"
            autoComplete="on"
            onChange={(e) => setData({ ...data, salary: e.target.value })}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputBankAccount" className="form-label">
            Bank Account Number
          </label>
          <input
            type="number"
            className="form-control"
            id="inputBankAccount"
            placeholder="Enter Bank Account Number"
            autoComplete="on"
            onChange={(e) => setData({ ...data, bankAccount: e.target.value })}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputBankName" className="form-label">
            Bank Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputBankName"
            placeholder="Enter Bank Name"
            autoComplete="on"
            onChange={(e) => setData({ ...data, bankName: e.target.value })}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputPanNumber" className="form-label">
            PAN Number
          </label>
          <input
            type="text"
            className="form-control"
            id="inputPanNumber"
            placeholder="Enter Pan Number"
            autoComplete="on"
            onChange={(e) => setData({ ...data, panNumber: e.target.value })}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputBanIfcs" className="form-label">
            Bank IFSC
          </label>
          <input
            type="text"
            className="form-control"
            id="inputBanIfcs"
            placeholder="Enter Bank IFSC"
            autoComplete="on"
            onChange={(e) => setData({ ...data, bankIfsc: e.target.value })}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputBonus" className="form-label">
            Bonus Component
          </label>
          <input
            type="number"
            className="form-control"
            id="inputBonus"
            placeholder="Enter Bonus"
            autoComplete="on"
            onChange={(e) => setData({ ...data, bonus: e.target.value })}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
            autoComplete="on"
            onChange={(e) => setData({ ...data, address: e.target.value })}
          />
        </div>
        <div className="col-12 mb-3">
          <label className="form-label" htmlFor="inputGroupFile01">
            Select Image
          </label>
          <input
            type="file"
            className="form-control"
            id="inputGroupFile01"
            onChange={(e) => setData({ ...data, image: e.target.files[0] })}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEmployee;

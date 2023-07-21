import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditEmployee() {
  const [data, setData] = useState({
    id: "",
    image: "",
    name: "",
    email: "",
    address: "",
    designation: "",
    salary: "",
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
          name: res.data.Result[0].name,
          email: res.data.Result[0].email,
          address: res.data.Result[0].address,
          salary: res.data.Result[0].salary,
          designation: res.data.Result[0].designation,
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
          {" " + data.name}
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
          {/* <input
            type="email"
            className="form-control"
            id="inputEmail4"
            placeholder="Enter Email"
            autoComplete="off"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            value={data.email}
          /> */}
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
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditEmployee;

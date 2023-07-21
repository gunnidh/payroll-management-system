import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Employee() {
  const [data, setData] = useState([]);
  const [adminData, setAdminData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/getEmployee")
      .then((res) => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8081/getAdmins")
      .then((res) => {
        if (res.data.Status === "Success") {
          setAdminData(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8081/delete/" + id)
      .then((res) => {
        if (res.data.Status === "Success") {
          window.location.reload(true);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleAddAdmin = (id) => {
    axios
      .get("http://localhost:8081/addAdmin/" + id)
      .then((res) => {
        if (res.data.Status === "Success") {
          window.location.reload(true);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  function CheckIfAdmin({ id }) {
    if (!adminData.find((obj) => obj.id === id)) {
      //console.log(adminData);
      return (
        <button
          onClick={(e) => handleAddAdmin(id)}
          className="btn btn-warning btn-sm me-2"
        >
          Make Admin
        </button>
      );
    }
  }

  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-2">
        <h3>Employee List</h3>
      </div>
      
      <Link to="/create" className="btn btn-success">
        Add Employee
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Emp. ID</th>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Designation</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee, index) => {
              return (
                <tr key={index}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>
                    {
                      <img
                        src={`http://localhost:8081/images/` + employee.image}
                        alt=""
                        className="employee_image"
                      />
                    }
                  </td>
                  <td>{employee.email}</td>
                  <td>{employee.address}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.salary}</td>
                  <td>
                    <Link
                      to={`/employeeDetail/` + employee.id}
                      className="btn btn-success btn-sm me-2"
                    >
                      View Details
                    </Link>

                    <Link
                      to={`/employeeEdit/` + employee.id}
                      className="btn btn-primary btn-sm me-2"
                    >
                      Edit
                    </Link>

                    <CheckIfAdmin id={employee.id} />

                    <button
                      onClick={(e) => handleDelete(employee.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employee;

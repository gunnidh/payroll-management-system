import React from "react";
import { useNavigate } from "react-router-dom";

function Start() {
    const navigate = useNavigate();
    return (
        <div>
            <header>
                <h4>
                    This Payroll Management System is designed & developed by Gunnidh Kaur
                </h4>
            </header>
            <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
                <div className="p-3 rounded w-25 border loginForm text-center">
                    <h2>Welcome to Payroll Management System</h2>
                    <div className="d-flex justify-content-between mt-5">
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={(e) => navigate("/employeeLogin")}
                        >
                            Employee
                        </button>
                        <button
                            className="btn btn-warning btn-lg"
                            onClick={(e) => navigate("/login")}
                        >
                            Admin
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Start;

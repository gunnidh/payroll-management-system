import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mysql from "mysql2";
import multer from "multer";
import path from "path";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db-company",
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

con.connect(function (err) {
  if (err) {
    console.log("Error in Connection", err);
  } else {
    console.log("Connected");
  }
});

app.get("/getEmployee", (req, res) => {
  const sql =
    "SELECT MAX(compensation.creationTime) as rollOutMonth, employee.id, employee.name, employee.email, employee.address, employee.image, compensation.basicSalary AS salary, compensation.designation, compensation.houseRentAllowance, compensation.travelAllowance, compensation.dearnessAllowance, compensation.grossSalary, compensation.providentFund, compensation.pensionFund, compensation.bonusAmount, compensation.netSalary FROM employee INNER JOIN compensation ON employee.id = compensation.id GROUP BY compensation.id HAVING MAX(compensation.creationTime)";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Get employee error in sql" });

    return res.json({ Status: "Success", Result: result });
  });
});

app.get("/getAdmins", (req, res) => {
  const sql =
    "SELECT employee.id, employee.email FROM employee INNER JOIN admin ON employee.id=admin.id";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Get employee error in sql" });

    return res.json({ Status: "Success", Result: result });
  });
});

app.get("/get/:id", (req, res) => {
  const id = req.params.id;
  const sql =
    "SELECT compensation.creationTime , employee.id, employee.name, employee.email, employee.address, employee.image, employee.bankName, employee.bankAccount, employee.panNumber, employee.bankIfsc, compensation.basicSalary AS salary, compensation.designation, compensation.houseRentAllowance, compensation.travelAllowance, compensation.dearnessAllowance, compensation.grossSalary, compensation.providentFund, compensation.pensionFund, compensation.bonusAmount, compensation.netSalary, compensation.rollOutMonth FROM employee INNER JOIN compensation ON employee.id = compensation.id WHERE compensation.id = ? ORDER BY compensation.creationTime DESC";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "Get employee error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});

app.get("/addAdmin/:id", (req, res) => {
  const id = req.params.id;
  const sql = "INSERT INTO admin (`id`) VALUE(?)";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "Get employee error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});

app.get("/removeAdmin/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM admin WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "Get employee error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You are no Authenticated" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) return res.json({ Error: "Token wrong" });
      req.role = decoded.role;
      req.id = decoded.id;
      next();
    });
  }
};

app.get("/dashboard", verifyUser, (req, res) => {
  return res.json({ Status: "Success", role: req.role, id: req.id });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

app.get("/adminCount", (req, res) => {
  const sql = "Select count(id) as adminCnt from admin";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error in runnig query" });
    return res.json(result);
  });
});

app.get("/employeeCount", (req, res) => {
  const sql = "Select count(id) as employee from employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error in runnig query" });
    return res.json(result);
  });
});

app.get("/salary", (req, res) => {
  const sql = "Select sum(basicSalary) as sumOfSalary from compensation";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error in runnig query" });
    return res.json(result);
  });
});

app.get("/salarySlip/:id", (req, res) => {
  const id = req.params.id;
  const getAllSalarySlips = "SELECT * FROM salary_records WHERE id = ?";
  con.query(getAllSalarySlips, [id], (err, result) => {
    if (err)
      return res.json({
        Error: "Error while getting result from salary records table in sql",
      });
    return res.json({ Status: "Success", Result: result });
  });
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const sql = "INSERT INTO compensation (`id`, `basicSalary`, `designation`, `rollOutMonth`) VALUES (?)";
  const data = [
    id,
    req.body.salary,
    req.body.designation,
    req.body.rollOutMonth,
  ]
  con.query(sql, [data], (err, result) => {
    if (err) {
      console.log(err)
      return res.json({ Error: "update employee error in sql" });
    }
    return res.json({ Status: "Success" });
  });
});

app.post("/login", (req, res) => {
  console.log("/login");
  const sql =
    "SELECT employee.id, employee_credentials.password FROM employee INNER JOIN admin ON employee.id = admin.id INNER JOIN employee_credentials ON employee.id = employee_credentials.id WHERE employee.email = ?";
  con.query(sql, [req.body.email], (err, result) => {
    if (err) {
      return res.json({ Status: "Error", Error: "Error in runnig query" });
    }
    if (result.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        result[0].password,
        (err, response) => {
          if (err) {
            return res.json({
              Status: "Error",
              Error: "Wrong Email or Password",
            });
          }
          if (response) {
            const empId = result[0].id;
            const token = jwt.sign(
              { role: "admin", id: empId },
              "jwt-secret-key",
              { expiresIn: "1d" }
            );
            res.cookie("token", token);
            return res.json({ Status: "Success" });
          } else {
            return res.json({
              Status: "Error",
              Error: "Wrong Email or Password",
            });
          }
        }
      );
    }
  });
});

app.post("/employeeLogin", (req, res) => {
  const sql =
    "SELECT employee.id, employee_credentials.password FROM employee INNER JOIN employee_credentials ON employee.id = employee_credentials.id Where employee.email = ?";
  con.query(sql, [req.body.email], (err, result) => {
    if (err)
      return res.json({ Status: "Error", Error: "Error in runnig query" });
    if (result.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        result[0].password,
        (err, response) => {
          if (err) return res.json({ Error: "password error" });
          if (response) {
            const token = jwt.sign(
              { role: "employee", id: result[0].id },
              "jwt-secret-key",
              { expiresIn: "1d" }
            );
            res.cookie("token", token);
            return res.json({ Status: "Success", id: result[0].id });
          } else {
            return res.json({
              Status: "Error",
              Error: "Wrong Email or Password",
            });
          }
        }
      );
    } else {
      return res.json({ Status: "Error", Error: "Wrong Email or Password" });
    }
  });
});

app.post("/create", upload.single("image"), (req, res) => {
  const insertEmpDetails =
    "INSERT INTO employee (`name`,`email`, `address`,`image`, `bankAccount`,`panNumber`, `bankName`, `bankIfsc`) VALUES (?)";
  bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
    if (err) return res.json({ Error: "Error in hashing password" });
    const values = [
      req.body.name,
      req.body.email,
      req.body.address,
      req.file.filename,
      req.body.bankAccount,
      req.body.panNumber,
      req.body.bankName,
      req.body.bankIfsc,
    ];
    con.query(insertEmpDetails, [values], (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.json({ Error: "Inside create employee query" });
      }
      const insertCompensation =
        "INSERT INTO compensation (`id`, `basicSalary`, `designation`, `bonusAmount`) VALUES (?)";
      const compensationDetails = [
        results.insertId,
        req.body.salary,
        req.body.designation,
        req.body.bonus,
      ];
      con.query(
        insertCompensation,
        [compensationDetails],
        (err, results, fields) => {
          if (err)
            return res.json({
              Error: "Inside add employee compensation query",
            });
          const insertEmpCreds =
            "INSERT INTO employee_credentials (`id`, `password`) VALUE(?)";
          const empCreds = [results.insertId, hash];
          con.query(insertEmpCreds, [empCreds], (err, results, fields) => {
            if (err)
              return res.json({
                Error: "Inside add employee credentials query",
              });
            return res.json({ Status: "Success" });
          });
        }
      );
    });
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "Delete FROM employee WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "delete employee error in sql" });
    return res.json({ Status: "Success" });
  });
});

app.listen(8081, () => {
  console.log("Running");
});

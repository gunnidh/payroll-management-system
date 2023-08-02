Payrole management system
 

Respective endpoints are using following MySQL commands:-
--------------------------------------------------------

END_POINT: /getAdmins
`SELECT 
employee.id, 
employee.email 
FROM employee 
INNER JOIN admin ON employee.id=admin.id`

----------

END_POINT: /get/:id

SELECT
employee.id, 
employee.firstName, 
employee.lastName,
employee.email, 
employee.address, 
employee.image,
employee.bankAccount, 
bank_details.bankName, 
bank_details.panNumber, 
bank_details.bankIfsc,
compensation.creationTime, 
compensation.basicSalary AS salary, 
compensation.designation,
compensation.departmentId, 
compensation.houseRentAllowance, 
compensation.travelAllowance, 
compensation.dearnessAllowance, 
compensation.grossSalary, 
compensation.providentFund, 
compensation.pensionFund, 
compensation.bonusAmount, 
compensation.netSalary, 
compensation.rollOutMonth 
FROM employee 
INNER JOIN compensation ON employee.id = compensation.id 
INNER JOIN bank_details ON employee.bankAccount = bank_details.bankAccount
WHERE compensation.id = ?  ORDER BY compensation.creationTime DESC

--------

END_POINT: /addAdmin/:id

INSERT INTO admin (`id`) VALUE(?)

---------

END_POINT: /removeAdmin/:id

DELETE FROM admin WHERE id = ?

---------

END_POINT: /adminCount

SELECT COUNT(id) as adminCnt FROM admin

------------

END_POINT: /employeeCount

SELECT COUNT(id) as employee FROM employee

------------

END_POINT: /salary

SELECT SUM(s_temp.sumOfSalary) AS sumOfSalary 
FROM (
SELECT 
SUM(c.basicSalary) AS sumOfSalary
FROM employee e
JOIN (
    SELECT id, MAX(creationTime) AS latestCreationTime
    FROM compensation
    GROUP BY id
) latest_compensation
ON e.id = latest_compensation.id
JOIN compensation c 
ON e.id = c.id 
AND latest_compensation.latestCreationTime = c.creationTime
GROUP BY e.id, e.firstName, e.lastName
) s_temp

----------------

END_POINT: /update/:id

INSERT INTO compensation (`id`, `basicSalary`, `designation`, `rollOutMonth`) VALUES (?)

-----------------

END_POINT: /adminLogin

SELECT employee.id, 
employee_credentials.password 
FROM employee 
INNER JOIN admin ON employee.id = admin.id 
INNER JOIN employee_credentials ON employee.id = employee_credentials.id 
WHERE employee.email = ?

-------------------

END_POINT: /employeeLogin

SELECT employee.id, 
employee_credentials.password 
FROM employee INNER JOIN employee_credentials ON employee.id = employee_credentials.id 
WHERE employee.email = ?

-------------------

END_POINT: /create 

INSERT INTO employee 
(`firstName`, `lastName`, `email`, `address`,`image`, `bankAccount`,`panNumber`, `bankName`, bankIfsc`) VALUES (?)

INSERT INTO compensation (`id`, `basicSalary`, `designation`, `bonusAmount`) VALUES (?)

INSERT INTO employee_credentials (`id`, `password`) VALUE(?)

---------------------

END_POINT: /delete/:id

Delete FROM employee WHERE id = ?
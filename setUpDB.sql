CREATE TABLE `admin` (
  `adminId` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `creationTime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `admin` (`adminId`, `id`, `creationTime`) VALUES
(1, 32, '2023-07-21 16:13:22');

CREATE TABLE `bank_details` (
  `bankAccount` bigint(11) NOT NULL,
  `bankName` varchar(100) NOT NULL,
  `panNumber` varchar(100) NOT NULL,
  `bankIfsc` varchar(100) NOT NULL,
  `creationTime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `bank_details` (`bankAccount`, `bankName`, `panNumber`, `bankIfsc`, `creationTime`) VALUES
(7657659, 'HDFC', '777GTRF0CCI', 'HDFC0038', '2023-07-22 01:01:18'),
(23456712, 'SBI', 'SBI67890', 'SBIN003', '2023-07-22 03:44:11'),
(334567443, 'ICICI Bank', 'ABCDE1234F', 'ICIC000001', '2023-07-22 03:44:11'),
(345464764, 'State Bank of India', 'FGHIJ5678K', 'SBIN000002', '2023-07-22 03:44:11'),
(456789123, 'Bank of America', 'BOA98765', 'BOA0011', '2023-07-22 03:44:11'),
(456789124, 'Chase Bank', 'CHASE54321', 'CHASE002', '2023-07-22 03:44:11'),
(543224556, 'Chase Bank', 'RSTUV3456W', 'CHAS000004', '2023-07-22 03:44:11'),
(765412221, 'HDFC', 'HQ234BN00H', 'HDFC0034', '2023-07-22 01:17:42'),
(2147483647, 'Axis Bank', 'HQ435GH89', 'AXIS009', '2023-07-21 16:13:10'),
(21474003646, 'ICICI', 'ICICI12345', 'ICIC0022', '2023-07-22 03:44:11');

CREATE TABLE `compensation` (
  `transactionId` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `basicSalary` bigint(11) NOT NULL,
  `designation` varchar(50) NOT NULL,
  `departmentId` int(11) NOT NULL,
  `houseRentAllowance` bigint(20) GENERATED ALWAYS AS (`basicSalary` * 0.2) STORED,
  `travelAllowance` bigint(20) GENERATED ALWAYS AS (`basicSalary` * 0.15) STORED,
  `dearnessAllowance` bigint(20) GENERATED ALWAYS AS (`basicSalary` * 0.18) STORED,
  `grossSalary` bigint(20) GENERATED ALWAYS AS (`basicSalary` + `basicSalary` * 0.2 + `basicSalary` * 0.15) STORED,
  `taxDeducted` bigint(20) GENERATED ALWAYS AS ((`basicSalary` + `basicSalary` * 0.2 + `basicSalary` * 0.15) * 0.25) STORED,
  `providentFund` bigint(20) GENERATED ALWAYS AS (`basicSalary` * 0.12) STORED,
  `pensionFund` bigint(20) GENERATED ALWAYS AS (`basicSalary` * 0.08) STORED,
  `bonusAmount` bigint(20) DEFAULT NULL,
  `netSalary` bigint(20) GENERATED ALWAYS AS (`basicSalary` + `basicSalary` * 0.2 + `basicSalary` * 0.15 - (`basicSalary` + `basicSalary` * 0.2 + `basicSalary` * 0.15) * 0.25 - `basicSalary` * 0.12 - `basicSalary` * 0.08 + coalesce(`bonusAmount`,0)) STORED,
  `rollOutMonth` varchar(20) NOT NULL,
  `creationTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `compensation` (`transactionId`, `id`, `basicSalary`, `designation`, `departmentId`, `bonusAmount`, `rollOutMonth`, `creationTime`) VALUES
(1, 32, 1000000, 'Admin', 1, 50000, 'January', '2023-07-22 10:26:17'),
(9, 41, 2300000, 'Senior CA', 2, NULL, 'August', '2023-07-22 10:26:37'),
(10, 43, 1300000, 'SDE2', 3, 300000, '', '2023-07-22 10:26:55'),
(12, 44, 1100000, 'Admin', 2, 50000, 'July', '2023-07-22 10:32:38'),
(13, 45, 1200000, 'Head of Sales', 1, 7000, 'July', '2023-07-22 10:29:44'),
(14, 46, 1300000, 'HR Intern', 4, 50000, 'July', '2023-07-22 10:32:56'),
(15, 47, 1400000, 'System Engineer', 3, 5000, 'July', '2023-07-22 10:33:02'),
(16, 48, 1500000, 'Resource Specialist', 4, 50000, 'July', '2023-07-22 10:33:05'),
(17, 49, 1600000, 'HR Analyst', 4, 40000, 'July', '2023-07-22 10:33:07'),
(18, 50, 1700000, 'Procurement Specialist', 1, 45000, 'July', '2023-07-22 10:33:11');


CREATE TABLE `department` (
  `departmentId` int(11) NOT NULL,
  `departmentName` varchar(30) NOT NULL,
  `minSalaryRange` bigint(20) NOT NULL,
  `maxSalaryRange` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `department` (`departmentId`, `departmentName`, `minSalaryRange`, `maxSalaryRange`) VALUES
(1, 'Sales', 350000, 2500000),
(2, 'Accounts', 800000, 15000000),
(3, 'Engineering', 1000000, 35000000),
(4, 'HR', 900000, 6000000);

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(40) NOT NULL,
  `contactNumber` bigint(20) NOT NULL,
  `address` varchar(150) NOT NULL,
  `image` varchar(50) NOT NULL,
  `bankAccount` bigint(11) NOT NULL,
  `departmentId` int(20) NOT NULL,
  `creationTime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `employee` (`id`, `firstName`, `lastName`, `email`, `contactNumber`, `address`, `image`, `bankAccount`, `departmentId`, `creationTime`) VALUES
(32, 'Admin', 'Root', 'admin@gmail.com', 0, 'Bangalore, India', 'image_1689955990207.jpeg', 2147483647, 1, '2023-07-21 16:13:10'),
(41, 'Suma', 'Bhat', 'suma@gmail.com', 9999035299, 'Bangalore, India', 'image_1689987678635.jpg', 7657659, 2, '2023-07-22 01:01:18'),
(43, 'Gunnidh', 'Kaur', 'gkaur@gmail.com', 7901808055, 'Bangalore, India', 'image_1689988662059.jpg', 765412221, 3, '2023-07-22 01:17:42'),
(44, 'Joe', 'Biden', 'joeone@gamil.com', 1234567, 'India', '', 543224556, 2, '2023-07-22 09:03:01'),
(45, 'Joe', 'Nicholas', 'joetwo@gmail.com', 6738958993, 'US', '', 345464764, 1, '2023-07-22 09:03:01'),
(46, 'Priya', 'Ray', 'newuser@gmail.com', 356678544, 'UK', '12356774', 334567443, 4, '2023-07-22 09:04:32'),
(47, 'Dolly', 'Singh', 'dolly@gmail.com', 345778445, 'Bangalore', '4456743', 21474003646, 3, '2023-07-22 09:14:11'),
(48, 'Rashmi', 'Khandelwal', 'rashmi@gmail.com', 324686432, 'Bangalore', '345785235', 23456712, 4, '2023-07-22 09:14:11'),
(49, 'Tony', 'Stark', 'new@gmail.com', 23456781, 'Australia', '345678534', 456789123, 4, '2023-07-22 09:14:11'),
(50, 'Aashma', 'brew', 'aba@gmai.com', 345678912, 'France', '8765322345', 456789124, 1, '2023-07-22 09:14:11');

CREATE TABLE `employee_credentials` (
  `id` int(11) NOT NULL,
  `password` varchar(200) NOT NULL DEFAULT '$2b$10$LEHD7osFjs.ewMImEGTMke80mYTRSm60wRm1MPll7wZ6JpgENTQKm',
  `creationTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `updationTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `employee_credentials` (`id`, `password`, `creationTime`, `updationTime`) VALUES
(32, '$2b$10$LEHD7osFjs.ewMImEGTMke80mYTRSm60wRm1MPll7wZ6JpgENTQKm', '2023-07-21 16:13:10', '2023-07-21 16:13:10'),
(41, '$2b$10$LEHD7osFjs.ewMImEGTMke80mYTRSm60wRm1MPll7wZ6JpgENTQKm', '2023-07-22 08:27:35', '2023-07-22 08:27:35'),
(43, '$2b$10$LEHD7osFjs.ewMImEGTMke80mYTRSm60wRm1MPll7wZ6JpgENTQKm', '2023-07-22 08:27:35', '2023-07-22 08:27:35'),
(44, '$2b$10$LEHD7osFjs.ewMImEGTMke80mYTRSm60wRm1MPll7wZ6JpgENTQKm', '2023-07-22 09:20:03', '2023-07-22 09:20:03'),
(45, '$2b$10$LEHD7osFjs.ewMImEGTMke80mYTRSm60wRm1MPll7wZ6JpgENTQKm', '2023-07-22 09:20:03', '2023-07-22 09:20:03'),
(46, '$2b$10$LEHD7osFjs.ewMImEGTMke80mYTRSm60wRm1MPll7wZ6JpgENTQKm', '2023-07-22 09:20:44', '2023-07-22 09:20:44'),
(48, '$2b$10$LEHD7osFjs.ewMImEGTMke80mYTRSm60wRm1MPll7wZ6JpgENTQKm', '2023-07-22 09:20:44', '2023-07-22 09:20:44'),
(49, '$2b$10$LEHD7osFjs.ewMImEGTMke80mYTRSm60wRm1MPll7wZ6JpgENTQKm', '2023-07-22 09:20:44', '2023-07-22 09:20:44');


--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`adminId`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `bank_details`
--
ALTER TABLE `bank_details`
  ADD PRIMARY KEY (`bankAccount`);

--
-- Indexes for table `compensation`
--
ALTER TABLE `compensation`
  ADD PRIMARY KEY (`transactionId`),
  ADD KEY `compensation_ibfk_1` (`id`),
  ADD KEY `departmentId` (`departmentId`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`departmentId`),
  ADD UNIQUE KEY `department_name` (`departmentName`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `bankAccount` (`bankAccount`),
  ADD KEY `department_id` (`departmentId`);

--
-- Indexes for table `employee_credentials`
--
ALTER TABLE `employee_credentials`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `compensation`
--
ALTER TABLE `compensation`
  MODIFY `transactionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `departmentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `employee_credentials`
--
ALTER TABLE `employee_credentials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`id`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `bank_details`
--
ALTER TABLE `bank_details`
  ADD CONSTRAINT `bank_details_ibfk_1` FOREIGN KEY (`bankAccount`) REFERENCES `employee` (`bankAccount`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `compensation`
--
ALTER TABLE `compensation`
  ADD CONSTRAINT `compensation_ibfk_1` FOREIGN KEY (`id`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `compensation_ibfk_2` FOREIGN KEY (`departmentId`) REFERENCES `department` (`departmentId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`departmentId`) REFERENCES `department` (`departmentId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `employee_credentials`
--
ALTER TABLE `employee_credentials`
  ADD CONSTRAINT `employee_credentials_ibfk_1` FOREIGN KEY (`id`) REFERENCES `employee` (`id`) ON DELETE CASCADE;
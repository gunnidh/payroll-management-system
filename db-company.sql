-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 05, 2023 at 11:56 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db-company`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `adminId` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `creationTime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`adminId`, `id`, `creationTime`) VALUES
(1, 32, '2023-07-21 10:43:22');

-- --------------------------------------------------------

--
-- Table structure for table `bank_details`
--

CREATE TABLE `bank_details` (
  `bankAccount` bigint(11) NOT NULL,
  `bankName` varchar(100) NOT NULL,
  `panNumber` varchar(100) NOT NULL,
  `bankIfsc` varchar(100) NOT NULL,
  `creationTime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bank_details`
--

INSERT INTO `bank_details` (`bankAccount`, `bankName`, `panNumber`, `bankIfsc`, `creationTime`) VALUES
(2147483647, 'Axis Bank', 'HQ435GH89', 'AXIS009', '2023-07-21 10:43:10');

-- --------------------------------------------------------

--
-- Table structure for table `compensation`
--

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

--
-- Dumping data for table `compensation`
--

INSERT INTO `compensation` (`transactionId`, `id`, `basicSalary`, `designation`, `departmentId`, `bonusAmount`, `rollOutMonth`, `creationTime`) VALUES
(1, 32, 1000000, 'Admin', 1, 50000, 'January', '2023-07-22 04:56:17');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `departmentId` int(11) NOT NULL,
  `departmentName` varchar(30) NOT NULL,
  `minSalaryRange` bigint(20) NOT NULL,
  `maxSalaryRange` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`departmentId`, `departmentName`, `minSalaryRange`, `maxSalaryRange`) VALUES
(1, 'Sales', 350000, 2500000),
(2, 'Accounts', 800000, 15000000),
(3, 'Engineering', 1000000, 35000000),
(4, 'HR', 900000, 6000000);

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

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

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `firstName`, `lastName`, `email`, `contactNumber`, `address`, `image`, `bankAccount`, `departmentId`, `creationTime`) VALUES
(32, 'Admin', 'Root', 'admin@gmail.com', 0, 'Bangalore, India', 'default.jpeg', 2147483647, 1, '2023-07-21 10:43:10');

-- --------------------------------------------------------

--
-- Table structure for table `employee_credentials`
--

CREATE TABLE `employee_credentials` (
  `id` int(11) NOT NULL,
  `password` varchar(200) NOT NULL DEFAULT '$2b$10$LEHD7osFjs.ewMImEGTMke80mYTRSm60wRm1MPll7wZ6JpgENTQKm',
  `creationTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `updationTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_credentials`
--

INSERT INTO `employee_credentials` (`id`, `password`, `creationTime`, `updationTime`) VALUES
(32, '$2b$10$LEHD7osFjs.ewMImEGTMke80mYTRSm60wRm1MPll7wZ6JpgENTQKm', '2023-07-21 10:43:10', '2023-07-21 10:43:10');

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
  MODIFY `transactionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `departmentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `employee_credentials`
--
ALTER TABLE `employee_credentials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

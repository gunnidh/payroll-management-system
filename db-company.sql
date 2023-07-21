-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 21, 2023 at 04:26 PM
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
  `id` int(11) NOT NULL,
  `creationTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `updationTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `creationTime`, `updationTime`) VALUES
(31, '2023-07-21 12:04:22', '2023-07-21 12:04:22');

-- --------------------------------------------------------

--
-- Table structure for table `compensation`
--

CREATE TABLE `compensation` (
  `id` int(11) NOT NULL,
  `salary` int(11) NOT NULL,
  `designation` varchar(50) NOT NULL,
  `houseRentAllowance` double GENERATED ALWAYS AS (`salary` * 0.2) STORED,
  `travelAllowance` double GENERATED ALWAYS AS (`salary` * 0.15) STORED,
  `dearnessAllowance` double GENERATED ALWAYS AS (`salary` * 0.18) STORED,
  `grossSalary` double GENERATED ALWAYS AS (`salary` + `salary` * 0.2 + `salary` * 0.15) STORED,
  `taxDeducted` double GENERATED ALWAYS AS ((`salary` + `salary` * 0.2 + `salary` * 0.15) * 0.25) STORED,
  `providentFund` double GENERATED ALWAYS AS (`salary` * 0.12) STORED,
  `pensionFund` double GENERATED ALWAYS AS (`salary` * 0.08) STORED,
  `bonusAmount` double DEFAULT NULL,
  `netSalary` double GENERATED ALWAYS AS (`salary` + `salary` * 0.2 + `salary` * 0.15 - (`salary` + `salary` * 0.2 + `salary` * 0.15) * 0.25 - `salary` * 0.12 - `salary` * 0.08 + coalesce(`bonusAmount`,0)) STORED,
  `creationTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `updationTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `compensation`
--

INSERT INTO `compensation` (`id`, `salary`, `designation`, `bonusAmount`, `creationTime`, `updationTime`) VALUES
(31, 1200000, 'SDE2', 100000, '2023-07-21 12:03:47', '2023-07-21 12:03:47');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(40) NOT NULL,
  `address` varchar(150) NOT NULL,
  `image` varchar(50) NOT NULL,
  `bankAccount` int(11) NOT NULL,
  `bankName` varchar(100) NOT NULL,
  `panNumber` varchar(100) NOT NULL,
  `bankIfsc` varchar(100) NOT NULL,
  `creationTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `updationTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `name`, `email`, `address`, `image`, `bankAccount`, `bankName`, `panNumber`, `bankIfsc`, `creationTime`, `updationTime`) VALUES
(31, 'Ajay', 'dhawan@gmail.com', 'INDIA', 'image_1689941027212.jpeg', 2147483647, 'AXIS', 'ASDF9898ASDF', 'AXIS009', '2023-07-21 12:03:47', '2023-07-21 13:57:51');

-- --------------------------------------------------------

--
-- Table structure for table `employee_credentials`
--

CREATE TABLE `employee_credentials` (
  `id` int(11) NOT NULL,
  `password` varchar(200) NOT NULL,
  `creationTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `updationTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_credentials`
--

INSERT INTO `employee_credentials` (`id`, `password`, `creationTime`, `updationTime`) VALUES
(31, '$2b$10$miKWJPfgNYgxgPqLKmsP8eUJuMjWnK3v6OswsvZY2l6jm2/Z1tU8e', '2023-07-21 12:03:47', '2023-07-21 12:03:47');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `compensation`
--
ALTER TABLE `compensation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee_credentials`
--
ALTER TABLE `employee_credentials`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `compensation`
--
ALTER TABLE `compensation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `employee_credentials`
--
ALTER TABLE `employee_credentials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`id`) REFERENCES `employee` (`id`);

--
-- Constraints for table `compensation`
--
ALTER TABLE `compensation`
  ADD CONSTRAINT `compensation_ibfk_1` FOREIGN KEY (`id`) REFERENCES `employee` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `employee_credentials`
--
ALTER TABLE `employee_credentials`
  ADD CONSTRAINT `employee_credentials_ibfk_1` FOREIGN KEY (`id`) REFERENCES `employee` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

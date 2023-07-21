-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 18, 2023 at 07:29 PM
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
  `netSalary` double GENERATED ALWAYS AS (`salary` + `salary` * 0.2 + `salary` * 0.15 - (`salary` + `salary` * 0.2 + `salary` * 0.15) * 0.25 - `salary` * 0.12 - `salary` * 0.08 + coalesce(`bonusAmount`,0)) STORED
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `compensation`
--

INSERT INTO `compensation` (`id`, `salary`, `designation`, `bonusAmount`) VALUES
(21, 1500000, 'E1', 200000),
(22, 123456789, 'E2', 78000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `compensation`
--
ALTER TABLE `compensation`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `compensation`
--
ALTER TABLE `compensation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `compensation`
--
ALTER TABLE `compensation`
  ADD CONSTRAINT `compensation_ibfk_1` FOREIGN KEY (`id`) REFERENCES `employee` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

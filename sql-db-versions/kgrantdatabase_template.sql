-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 19, 2022 at 02:43 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kgrantdatabasev1`
--

-- --------------------------------------------------------

--
-- Table structure for table `donorgrants`
--

--
-- Table structure for table `donorgrants`
--

CREATE TABLE `donorgrants` (
  `id` int(11) NOT NULL,
  `donor_id` int(11) NOT NULL,
  `title` varchar(45) NOT NULL,
  `amount` double NOT NULL,
  `designation` varchar(45) NOT NULL,
  `donor` varchar(45) NOT NULL,
  `date_received` varchar(255) NOT NULL,
  `comments` text NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `donorgrants`
--

--
-- Dumping data for table `donorgrants`
--

INSERT INTO `donorgrants` (`id`, `donor_id`, `title`, `amount`, `designation`, `donor`, `date_received`, `comments`, `status`) VALUES
(4, 2, '2021 Grant', 1000.07, 'ENJU', 'Dis Fall', '2021-01-13', '', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `donors`
--

CREATE TABLE `donors` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` varchar(50) NOT NULL DEFAULT 'organization',
  `status` varchar(50) NOT NULL DEFAULT 'active',
  `contact_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `comments` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `donors`
--

INSERT INTO `donors` (`id`, `name`, `type`, `status`, `contact_name`, `email`, `comments`) VALUES
(2, 'Dis Fall', 'Individual', 'active', 'Dis Falll', 'disfall@gmail.com', 'first pipeline'),
(3, 'Texas Music', 'Organization', 'active', 'Head Music', 'texasmusic@gmail.com', '15th pipeline'),
(4, 'Baymond', 'Individual', 'active', 'Baymond Sure', 'baymondsure@gmail.com', '24th pipeline');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `donorgrants`
--
ALTER TABLE `donorgrants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `donor_id` (`donor_id`);

--
-- Indexes for table `donors`
--
ALTER TABLE `donors`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `donorgrants`
--
ALTER TABLE `donorgrants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `donors`
--
ALTER TABLE `donors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `donorgrants`
--
ALTER TABLE `donorgrants`
  ADD CONSTRAINT `donorgrants_ibfk_1` FOREIGN KEY (`donor_id`) REFERENCES `donors` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

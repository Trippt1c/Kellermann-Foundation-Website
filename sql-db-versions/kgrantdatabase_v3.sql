-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 19, 2022 at 02:43 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

/*SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
*/

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

DROP DATABASE IF EXISTS kgrantdatabaseV3;
CREATE Database kgrantdatabaseV3;
USE kgrantdatabaseV3;
--

-- --------------------------------------------------------


--
-- Table structure for table `OrgGrants`
--

CREATE TABLE `OrgGrants` (
  `id` int		AUTO_INCREMENT PRIMARY KEY,
  `org_id` int(11) NOT NULL,
  `title` varchar(45) NOT NULL,
  `amount` double NOT NULL,
  `designation` varchar(45) NOT NULL, 
  `application_due_date` DATE NOT NULL,
  `date_applied` DATE NOT NULL,
  `grant_decision_date` DATE NOT NULL,
  `funds_received_date` DATE NOT NULL,
  `report_due_date` DATE NOT NULL,
  `report_submitted_date` DATE NOT NULL,
  `grant_cycle` varchar(255) NOT NULL,
  `comments` text NOT NULL,
  `status` varchar(30) NOT NULL DEFAULT 'Need to Apply'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

 
-- --------------------------------------------------------

--
-- Table structure for table `Orgs`
--
-- Should we add address as an attribute?   
CREATE TABLE `Orgs` (
  `org_id` int	AUTO_INCREMENT	 NOT NULL PRIMARY KEY,
  `name` varchar(100) NOT NULL,
  `type` varchar(50) NOT NULL DEFAULT 'organization',
  `status` varchar(50) NOT NULL DEFAULT 'active',
  `contact_name` varchar(100) NOT NULL,
  `address_line1` varchar(60) NOT NULL,
  `address_line2` varchar(60) DEFAULT NULL,
  `city`  varchar(40) NOT NULL,
  `zipcode` varchar(10) NOT NULL,
  `state`   varchar(2)  NOT NULL,
  `phone_number` varchar(12) NOT NULL,
  `email` varchar(100) NOT NULL,
  `webaddress` varchar(50) DEFAULT NULL,
  `comments` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- 
--
-- Table structure for table `users`

CREATE TABLE `Users`(
    `id`       INT         AUTO_INCREMENT PRIMARY KEY,
    `username` varchar(50) NOT NULL UNIQUE,
    `password` varchar(50) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Alter table `orggrants` add a key
--
ALTER TABLE `orggrants`
  ADD KEY `org_id` (`org_id`);

--
-- Constraints for table `orggrants`
--
ALTER TABLE `orggrants`
  ADD CONSTRAINT `orggrants_ibfk_1` FOREIGN KEY (`org_id`) REFERENCES `orgs` (`org_id`);
COMMIT;
    
--
-- Dumping data for table `donors`
--

INSERT INTO `orgs` (`org_id`, `name`, `type`, `status`, `contact_name`, `address_line1`, `address_line2`,`city`,`zipcode`,`state`,`phone_number`,`email`,`webaddress`, `comments`) 
VALUES(2, 'Dis Fall', 'Individual', 'active', 'Dis Falll','123 Main St','Suite#100','Richardson','75080','TX','123-456-789','disfall@gmail.com','www.abcedef.com', 'first pipeline'),
(3, 'Texas Music', 'Organization', 'active', 'Head Music','345 Main St','Suite#200','Plano','75085', 'TX','123-654-987', 'texasmusic@gmail.com','www.hijklmn.com', '15th pipeline'),
(4, 'Baymond', 'Individual', 'active', 'Baymond Sure','678 Main St','Suite#501','Garland','75090', 'TX','123-456-987','baymondsure@gmail.com','www.fghikjkl.com', '24th pipeline');

--
-- Dumping data for table `orggrants`
--

INSERT INTO `orggrants` (`id`, `org_id`, `title`, `amount`, `designation`,
`application_due_date`,  `date_applied`, `grant_decision_date`, `funds_received_date`, `report_due_date`,
`report_submitted_date`, `grant_cycle`, `comments`, `status`) VALUES
(1, 2, '2021 Grant', 1000.07, 'ENJU', '2022-02-25', '2022-01-03', '2022-03-17', '2022-04-05',
    '2023-01-08', '2023-01-03', 'year 1 of 1','application under fiinal review', 'funded');
    
--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`,`username`, `password`) VALUES
(1,'MichaelSc', 'leaves123');

-- RESULT 
SELECT * from orgs;
SELECT * from orggrants;
SELECT * from users;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

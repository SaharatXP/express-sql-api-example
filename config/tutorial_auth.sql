-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Nov 24, 2023 at 08:56 PM
-- Server version: 5.7.39
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tutorial_auth`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `product_code` varchar(255) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_price` int(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_code`, `product_name`, `product_price`, `is_active`) VALUES
(1, 'CODE1', 'CODE1', 1000, 1),
(2, 'CODE2', 'CODE2', 2000, 1),
(3, 'CODE3', 'CODE3', 3000, 1),
(4, 'CODE4', 'CODE4', 4000, 1),
(5, 'CODE5', 'CODE5', 5000, 1),
(6, 'CODE6', 'CODE6', 5000, 1),
(7, 'CODE7', 'CODE6', 5000, 1),
(8, 'CODE8', 'CODE6', 5000, 1),
(9, 'CODE9', 'CODE6', 5000, 1),
(10, 'CODE10', 'CODE6', 5000, 1),
(11, 'CODE11', 'CODE6', 5000, 1),
(12, 'CODE12', 'CODE6', 5000, 1),
(13, 'CODE13', 'CODE6', 5000, 1),
(14, 'CODE14', 'CODE14', 14000, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `is_active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `username`, `password`, `role`, `is_active`) VALUES
(1, 'saharat', 'bank@mail.com', 'bank', '$2b$10$0ro1ch5O1/jESDBruoSIeucqe0cw7N7Wmg55vLp9SGafPG/H1nwmG', 'admin', 1),
(2, 'saharatx', 'bankx@mail.com', 'bankx', '$2b$10$Pu1GJIxhSOm2CraeuNOaP.O27IUgSPBiQunJZrxDAMOMbpqaXrt.W', 'user', 1),
(8, 'saharatx', 'bankz@mail.com', 'bankz', '$2b$10$oea0iiK4x88VwM/Cf7h0nO9l4z4b8BtshZbLaMOe.iTT2aAp2qClW', 'user', 1),
(9, 'saharatx', 'bankxp@mail.com', 'bankxp', '$2b$10$CDG/D7R1jnEKGdLiTffEm.psMT7DE2Yg4ta7EJ7lRIS08wDB/N69O', 'user', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD UNIQUE KEY `product_code` (`product_code`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

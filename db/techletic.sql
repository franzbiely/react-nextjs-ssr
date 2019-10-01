-- phpMyAdmin SQL Dump
-- version 4.5.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 01, 2019 at 12:51 PM
-- Server version: 5.7.11
-- PHP Version: 7.0.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `techletic`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `ID` int(11) NOT NULL,
  `parent_ID` int(11) NOT NULL,
  `product_ID` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `category_meta`
--

CREATE TABLE `category_meta` (
  `ID` int(11) NOT NULL,
  `category_ID` int(11) NOT NULL,
  `meta_key` varchar(50) NOT NULL,
  `meta_value` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `e-commerce links`
--

CREATE TABLE `e-commerce links` (
  `ID` int(11) NOT NULL,
  `seoppID` int(11) NOT NULL,
  `model_full` varchar(500) NOT NULL,
  `model_short` varchar(250) NOT NULL,
  `model_variant` varchar(100) NOT NULL,
  `product_source` varchar(150) NOT NULL,
  `product_url` varchar(150) NOT NULL,
  `affiliate_link` varchar(150) NOT NULL,
  `source_ID` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `ID` int(11) NOT NULL,
  `parent_ID` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `image` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `type` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product_meta`
--

CREATE TABLE `product_meta` (
  `ID` int(11) NOT NULL,
  `product_ID` int(11) NOT NULL,
  `meta_key` varchar(100) NOT NULL,
  `meta_value` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `ID` int(11) NOT NULL,
  `product_ID` int(11) NOT NULL,
  `source` varchar(100) NOT NULL,
  `link` varchar(150) NOT NULL,
  `title` varchar(100) NOT NULL,
  `image` varchar(150) NOT NULL,
  `rating` int(11) NOT NULL,
  `summary` varchar(500) NOT NULL,
  `description` varchar(500) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `scraped`
--

CREATE TABLE `scraped` (
  `ID` int(11) NOT NULL,
  `parent_ID` int(11) NOT NULL,
  `product_ID` int(11) NOT NULL,
  `scraper_source` varchar(100) NOT NULL,
  `scraped_url` varchar(150) NOT NULL,
  `timestamp` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `stores`
--

CREATE TABLE `stores` (
  `ID` int(11) NOT NULL,
  `parent_ID` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `domain` varchar(150) NOT NULL,
  `logo` varchar(100) NOT NULL,
  `type` varchar(50) NOT NULL,
  `address` varchar(150) NOT NULL,
  `isInternationalShipping` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `category_meta`
--
ALTER TABLE `category_meta`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `e-commerce links`
--
ALTER TABLE `e-commerce links`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `product_meta`
--
ALTER TABLE `product_meta`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `scraped`
--
ALTER TABLE `scraped`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `category_meta`
--
ALTER TABLE `category_meta`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `e-commerce links`
--
ALTER TABLE `e-commerce links`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `product_meta`
--
ALTER TABLE `product_meta`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `scraped`
--
ALTER TABLE `scraped`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `stores`
--
ALTER TABLE `stores`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

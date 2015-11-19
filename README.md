# sfb

-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 19, 2015 at 10:38 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `signalflowbuilder`
--

-- --------------------------------------------------------

--
-- Table structure for table `sig`
--

CREATE TABLE IF NOT EXISTS `sig` (
  `sig_id` int(11) NOT NULL AUTO_INCREMENT,
  `sig_title` text NOT NULL,
  `sig_html` text NOT NULL,
  `sig_links` text NOT NULL,
  `sig_taskTitle` text NOT NULL,
  `sig_taskSubTitle` text NOT NULL,
  `sig_tasks` text NOT NULL,
  `sig_objective` text NOT NULL,
  `sourceId_arr` text NOT NULL,
  `targetId_arr` text NOT NULL,
  PRIMARY KEY (`sig_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

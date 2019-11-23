-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 23, 2019 at 09:07 AM
-- Server version: 5.5.27
-- PHP Version: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `expenses_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE IF NOT EXISTS `expenses` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `task` varchar(20) NOT NULL,
  `amount` int(5) NOT NULL,
  `date` date NOT NULL,
  `comment` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19 ;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`id`, `task`, `amount`, `date`, `comment`) VALUES
(2, 'Skying', 200, '2019-05-06', 'Went to skying at home town'),
(4, 'Movie', 200, '2019-05-19', 'Went to movie with friends on weekend'),
(5, 'Washing', 300, '2019-05-10', 'Washed clothes outside'),
(7, 'Boating', 230, '2019-11-28', 'Went to boating with friends on a vacation'),
(8, 'Swimming', 100, '2019-05-16', 'Went to swimming pool.'),
(9, 'Dinner', 200, '2019-05-11', 'Went to dinner with friends'),
(11, 'Mall', 1000, '2019-05-02', 'Went to mall with friends on weekend'),
(13, 'Eating', 1000, '2019-07-18', 'Went to restaurent with friends'),
(14, 'Swimming', 200, '2019-11-14', 'Bavilo swimming'),
(15, 'movie', 150, '2019-11-14', 'Action movie'),
(18, 'Marriage', 3000, '2019-11-09', 'Went to Nellore to attend friend marriage');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`) VALUES
('admin', 'admin');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

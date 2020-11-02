CREATE DATABASE IF NOT EXISTS online_market_db;

USE online_market_db;

--
-- Table structure for table `customers_auth`
--

CREATE TABLE IF NOT EXISTS `customers_auth` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `address` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `sponsorid` varchar(50) NOT NULL DEFAULT 'NTM-0',
  `thread_id` VARCHAR(30) NOT NULL DEFAULT 'None',
  `max_user`  int(11) NOT NULL DEFAULT '0',
  `status`   VARCHAR(30) NOT NULL DEFAULT '0',
  `thread_pos`  int(11) NOT NULL DEFAULT '0',
  `thread_g`    VARCHAR(255) NOT NULL DEFAULT '0',
  `new_reg`  VARCHAR(30) NOT NULL DEFAULT '0',
  `joining_fees` DOUBLE NOT NULL DEFAULT '0',
  `balance` DOUBLE NOT NULL DEFAULT '0',
  `creaed_by` INT(30) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;


CREATE TABLE IF NOT EXISTS `company_table` (
  `cmp_id` int(30) NOT NULL AUTO_INCREMENT,
  `cmp_name` varchar(30) NOT NULL,
  `cmp_addr` varchar(30) NOT NULL,
  `Email_address` varchar(30) DEFAULT NULL,
  `email_password` varchar(100) DEFAULT NULL,
  `cmp_phone` varchar(15) NOT NULL,
  `saltation` varchar(255) NOT NULL,
  `subject_mail` varchar(30) NOT NULL,
  `init_mssage` varchar(100) NOT NULL,
  `greetings_mail` varchar(30) NOT NULL,
  `term_loan` double NOT NULL,
  `description` varchar(255) NOT NULL,
  `land_buildings` double NOT NULL,
  `furniture` double NOT NULL,
  `mashinery` double NOT NULL,
  `investment` double NOT NULL,
  `Location` varchar(30) NOT NULL DEFAULT '0',
  `status_type` varchar(30) NOT NULL DEFAULT '0',
  PRIMARY KEY (`cmp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE IF NOT EXISTS `transaction_table` (
  `trans_id` int(20) NOT NULL AUTO_INCREMENT,
  `customer_auth_id` int(20) NOT NULL,
  `trans_amount` double NOT NULL,
  `balanc_amount` double NOT NULL,
  `trans_type` varchar(30) NOT NULL DEFAULT 'CASH',
  `trans_name` varchar(30) NOT NULL,
  `trans_slipNo` varchar(30) NOT NULL,
  `date` varchar(30) NOT NULL,
  `repaidby` varchar(20) NOT NULL,
  `assignby` varchar(30) NOT NULL,
  `tpay_status` varchar(30) NOT NULL DEFAULT '0',
  PRIMARY KEY (`trans_id`),KEY (`customer_auth_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


INSERT INTO `company_table` (`cmp_id`, `cmp_name`, `cmp_addr`, `Email_address`, `email_password`, `cmp_phone`, `saltation`, `subject_mail`, `init_mssage`, `greetings_mail`, `term_loan`, `description`, `land_buildings`, `furniture`, `mashinery`, `investment`, `location`, `status_type`) VALUES
(9, 'NETWORK MARKETING', 'P O BOX 333 IRINGA', 'iringa@gmail.com', 'demo1234', '0999999990', 'Thank you! Welcome again', 'TAARIFA', 'Taarifa fupi', 'Habari mteja', 0, '', 0, 0, 0, 0, 'MAIN BRANCH', 'IRINGA');

ALTER TABLE `transaction_table`
  ADD CONSTRAINT `transaction_table_ibfk_1` FOREIGN KEY (`customer_auth_id`) REFERENCES `customers_auth` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

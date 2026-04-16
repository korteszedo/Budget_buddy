SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

DROP DATABASE IF EXISTS `Budget_buddy`;
CREATE DATABASE IF NOT EXISTS `Budget_buddy`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE `Budget_buddy`;

SET FOREIGN_KEY_CHECKS = 0;

DROP TRIGGER IF EXISTS `insert_user`;
DROP FUNCTION IF EXISTS `login`;
DROP FUNCTION IF EXISTS `pwd_encrypt`;

DROP TABLE IF EXISTS `Cel`;
DROP TABLE IF EXISTS `Tranzakcio`;
DROP TABLE IF EXISTS `Felhasznalo`;
DROP TABLE IF EXISTS `Kategoria`;
DROP TABLE IF EXISTS `Szerepkor`;

CREATE TABLE `Szerepkor` (
  `szerepkor_id` int NOT NULL AUTO_INCREMENT,
  `szerepkor_nev` varchar(50) NOT NULL,
  PRIMARY KEY (`szerepkor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `Felhasznalo` (
  `felhasznalo_id` int NOT NULL AUTO_INCREMENT,
  `nev` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `jelszo` varchar(255) NOT NULL,
  `szerepkor_id` int NOT NULL,
  PRIMARY KEY (`felhasznalo_id`),
  UNIQUE KEY `email` (`email`),
  KEY `szerepkor_id` (`szerepkor_id`),
  CONSTRAINT `Felhasznalo_ibfk_1`
    FOREIGN KEY (`szerepkor_id`) REFERENCES `Szerepkor` (`szerepkor_id`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `Kategoria` (
  `kategoria_id` int NOT NULL AUTO_INCREMENT,
  `kategoria_nev` varchar(100) NOT NULL,
  `tipus` enum('bevetel','kiadas') NOT NULL,
  PRIMARY KEY (`kategoria_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `Cel` (
  `cel_id` int NOT NULL AUTO_INCREMENT,
  `felhasznalo_id` int NOT NULL,
  `nev` varchar(100) NOT NULL,
  `osszeg_cel` int NOT NULL,
  `aktualis_osszeg` int DEFAULT 0,
  `hatarido` date DEFAULT NULL,
  PRIMARY KEY (`cel_id`),
  KEY `felhasznalo_id` (`felhasznalo_id`),
  CONSTRAINT `Cel_ibfk_1`
    FOREIGN KEY (`felhasznalo_id`) REFERENCES `Felhasznalo` (`felhasznalo_id`)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `Tranzakcio` (
  `tranzakcio_id` int NOT NULL AUTO_INCREMENT,
  `felhasznalo_id` int NOT NULL,
  `kategoria_id` int NOT NULL,
  `osszeg` int NOT NULL,
  `datum` date NOT NULL,
  `tipus` enum('bevetel','kiadas') NOT NULL,
  PRIMARY KEY (`tranzakcio_id`),
  KEY `felhasznalo_id` (`felhasznalo_id`),
  KEY `kategoria_id` (`kategoria_id`),
  CONSTRAINT `Tranzakcio_ibfk_1`
    FOREIGN KEY (`felhasznalo_id`) REFERENCES `Felhasznalo` (`felhasznalo_id`)
    ON DELETE CASCADE,
  CONSTRAINT `Tranzakcio_ibfk_2`
    FOREIGN KEY (`kategoria_id`) REFERENCES `Kategoria` (`kategoria_id`)
    ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `Szerepkor` (`szerepkor_id`, `szerepkor_nev`) VALUES
(1,'user'),
(2,'admin');

INSERT INTO `Felhasznalo` (`felhasznalo_id`, `nev`, `email`, `jelszo`, `szerepkor_id`) VALUES
(12,'Teszt Elek','teszt@gmail.com','3234424ea9a83431a14dda868bd8a9d686e0f18d9af680dcca676d3b7c19fd38',1),
(15,'Teszt Elek','teszt1@gmail.com','a6acd658255131b4afb64b2f733aac0aa5fb374bc4eb4b5e0176de2952e05455',1),
(18,'asdasdsad','asdada','b1cf2680221434822dc8c3198902b5aeb1f0e2bad32fa358962b4fbf0a499065',2),
(19,'1','1@1','1d5d790d617c4f53235207b18efb4521fde10fb13fc6e9f74d2979dbb5c370ff',2),
(25,'Goal Test User 1774202439828_29226','goal_1774202439828_29226@example.com','7e1b86d5c76963c6c16162ba749a4f9a510ce59636006d75b7b2c10ae3a791fd',1),
(26,'Tx Test User 1774202440577_76505','tx_1774202440577_76505@example.com','7e1b86d5c76963c6c16162ba749a4f9a510ce59636006d75b7b2c10ae3a791fd',1),
(27,'Auth Test User 1774202440999_72063','auth_1774202440999_72063@example.com','7e1b86d5c76963c6c16162ba749a4f9a510ce59636006d75b7b2c10ae3a791fd',1),
(29,'Goal Test User 1774202568949_26373','goal_1774202568949_26373@example.com','7e1b86d5c76963c6c16162ba749a4f9a510ce59636006d75b7b2c10ae3a791fd',1),
(30,'Tx Test User 1774202569445_3265','tx_1774202569445_3265@example.com','7e1b86d5c76963c6c16162ba749a4f9a510ce59636006d75b7b2c10ae3a791fd',1),
(31,'Auth Test User 1774202569797_55991','auth_1774202569797_55991@example.com','7e1b86d5c76963c6c16162ba749a4f9a510ce59636006d75b7b2c10ae3a791fd',1),
(33,'Goal Test User 1774202879404_43557','goal_1774202879404_43557@example.com','7e1b86d5c76963c6c16162ba749a4f9a510ce59636006d75b7b2c10ae3a791fd',1),
(34,'Tx Test User 1774202880093_10063','tx_1774202880093_10063@example.com','7e1b86d5c76963c6c16162ba749a4f9a510ce59636006d75b7b2c10ae3a791fd',1),
(35,'Auth Test User 1774202880640_85048','auth_1774202880640_85048@example.com','7e1b86d5c76963c6c16162ba749a4f9a510ce59636006d75b7b2c10ae3a791fd',1),
(37,'Goal Test User 1774287133917_52913','goal_1774287133917_52913@example.com','7e1b86d5c76963c6c16162ba749a4f9a510ce59636006d75b7b2c10ae3a791fd',1),
(38,'Auth Test User 1774287134386_48750','auth_1774287134386_48750@example.com','7e1b86d5c76963c6c16162ba749a4f9a510ce59636006d75b7b2c10ae3a791fd',1),
(40,'Tx Test User 1774287134634_67638','tx_1774287134634_67638@example.com','7e1b86d5c76963c6c16162ba749a4f9a510ce59636006d75b7b2c10ae3a791fd',1),
(41,'Goal Test User 1774287279202_28297','goal_1774287279202_28297@example.com','7e1b86d5c76963c6c16162ba749a4f9a510ce59636006d75b7b2c10ae3a791fd',1),
(42,'Tx Test User 1774287279602_77007','tx_1774287279602_77007@example.com','7e1b86d5c76963c6c16162ba749a4f9a510ce59636006d75b7b2c10ae3a791fd',1),
(43,'Auth Test User 1774287279877_92072','auth_1774287279877_92072@example.com','7e1b86d5c76963c6c16162ba749a4f9a510ce59636006d75b7b2c10ae3a791fd',1),
(45,'Goal Test User 1774287598132_35492','goal_1774287598132_35492@example.com','7e1b86d5c76963c6c16162ba749a4f9a510ce59636006d75b7b2c10ae3a791fd',1),
(46,'Auth Test User 1774287598127_9958','auth_1774287598127_9958@example.com','7e1b86d5c76963c6c16162ba749a4f9a510ce59636006d75b7b2c10ae3a791fd',1),
(48,'Tx Test User 1774287598252_19153','tx_1774287598252_19153@example.com','7e1b86d5c76963c6c16162ba749a4f9a510ce59636006d75b7b2c10ae3a791fd',1),
(49,'Auth Test User 1774287735246_25470','auth_1774287735246_25470@example.com','7e1b86d5c76963c6c16162ba749a4f9a510ce59636006d75b7b2c10ae3a791fd',1),
(50,'Tx Test User 1774287735260_59276','tx_1774287735260_59276@example.com','7e1b86d5c76963c6c16162ba749a4f9a510ce59636006d75b7b2c10ae3a791fd',1),
(52,'Goal Test User 1774287735328_74906','goal_1774287735328_74906@example.com','7e1b86d5c76963c6c16162ba749a4f9a510ce59636006d75b7b2c10ae3a791fd',1),
(53,'Tx Test User 1774287746333_27949','tx_1774287746333_27949@example.com','7e1b86d5c76963c6c16162ba749a4f9a510ce59636006d75b7b2c10ae3a791fd',1),
(54,'Goal Test User 1774287746698_8960','goal_1774287746698_8960@example.com','7e1b86d5c76963c6c16162ba749a4f9a510ce59636006d75b7b2c10ae3a791fd',1),
(55,'Auth Test User 1774287747005_34696','auth_1774287747005_34696@example.com','7e1b86d5c76963c6c16162ba749a4f9a510ce59636006d75b7b2c10ae3a791fd',1),
(57,'Tx Test User 1774450577640_61419','tx_1774450577640_61419@example.com','7e1b86d5c76963c6c16162ba749a4f9a510ce59636006d75b7b2c10ae3a791fd',1),
(58,'Auth Test User 1774450578252_81023','auth_1774450578252_81023@example.com','7e1b86d5c76963c6c16162ba749a4f9a510ce59636006d75b7b2c10ae3a791fd',1),
(60,'Goal Test User 1774450578636_29719','goal_1774450578636_29719@example.com','7e1b86d5c76963c6c16162ba749a4f9a510ce59636006d75b7b2c10ae3a791fd',1);

INSERT INTO `Kategoria` (`kategoria_id`, `kategoria_nev`, `tipus`) VALUES
(1,'Fizetés','bevetel'),
(2,'Ajándék','bevetel'),
(3,'Étel','kiadas'),
(4,'Lakbér','kiadas'),
(5,'Szórakozás','kiadas'),
(6,'Teszt kategoria','kiadas'),
(7,'as2422','kiadas');

INSERT INTO `Cel` (`cel_id`, `felhasznalo_id`, `nev`, `osszeg_cel`, `aktualis_osszeg`, `hatarido`) VALUES
(1,12,'Nyaralás',300000,80000,'2025-06-01'),
(2,12,'Laptop vásárlás',500000,150000,'2025-09-01');

INSERT INTO `Tranzakcio` (`tranzakcio_id`, `felhasznalo_id`, `kategoria_id`, `osszeg`, `datum`, `tipus`) VALUES
(1,12,1,350000,'2024-10-01','bevetel'),
(2,12,3,12000,'2024-10-02','kiadas'),
(3,12,4,150000,'2024-10-03','kiadas'),
(4,12,5,8000,'2024-10-05','kiadas'),
(6,12,3,8000,'2024-10-05','bevetel'),
(7,12,1,350000,'2024-10-01','bevetel'),
(8,12,3,12000,'2024-10-02','kiadas'),
(9,12,4,150000,'2024-10-03','kiadas'),
(10,12,4,150000,'2024-10-03','kiadas'),
(11,12,5,8000,'2024-10-05','kiadas'),
(12,12,3,243,'2025-12-29','kiadas'),
(14,26,6,1200,'2026-02-10','kiadas'),
(15,30,6,1200,'2026-02-10','kiadas'),
(16,34,6,1200,'2026-02-10','kiadas'),
(17,12,7,2323,'2026-03-22','kiadas'),
(18,40,6,1200,'2026-02-10','kiadas'),
(19,42,6,1200,'2026-02-10','kiadas'),
(20,48,6,1200,'2026-02-10','kiadas'),
(21,50,6,1200,'2026-02-10','kiadas'),
(22,53,6,1200,'2026-02-10','kiadas'),
(23,57,6,1200,'2026-02-10','kiadas');

DELIMITER $$

CREATE FUNCTION `pwd_encrypt`(pwd VARCHAR(255))
RETURNS VARCHAR(255)
DETERMINISTIC
RETURN SHA2(CONCAT(pwd, 'sozas'), 256)$$

CREATE FUNCTION `login`(email_in VARCHAR(100), pwd_in VARCHAR(100))
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE ok INT DEFAULT 0;

    SELECT felhasznalo_id INTO ok
    FROM Felhasznalo
    WHERE Felhasznalo.email = email_in
      AND Felhasznalo.jelszo = pwd_encrypt(pwd_in)
    LIMIT 1;

    RETURN ok;
END$$

CREATE TRIGGER `insert_user`
BEFORE INSERT ON `Felhasznalo`
FOR EACH ROW
BEGIN
    SET NEW.jelszo = pwd_encrypt(NEW.jelszo);
END$$

DELIMITER ;

SET FOREIGN_KEY_CHECKS = 1;
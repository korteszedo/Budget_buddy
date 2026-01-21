-- MySQL dump 10.13  Distrib 9.5.0, for Linux (x86_64)
--
-- Host: localhost    Database: Budget_buddy
-- ------------------------------------------------------
-- Server version	9.5.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--


--
-- Current Database: `Budget_buddy`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `Budget_buddy` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `Budget_buddy`;

--
-- Table structure for table `Cel`
--

DROP TABLE IF EXISTS `Cel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cel` (
  `cel_id` int NOT NULL AUTO_INCREMENT,
  `felhasznalo_id` int NOT NULL,
  `nev` varchar(100) NOT NULL,
  `osszeg_cel` int NOT NULL,
  `aktualis_osszeg` int DEFAULT '0',
  `hatarido` date DEFAULT NULL,
  PRIMARY KEY (`cel_id`),
  KEY `felhasznalo_id` (`felhasznalo_id`),
  CONSTRAINT `Cel_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `Felhasznalo` (`felhasznalo_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cel`
--

LOCK TABLES `Cel` WRITE;
/*!40000 ALTER TABLE `Cel` DISABLE KEYS */;
INSERT INTO `Cel` VALUES (1,12,'Nyaral+ís',300000,80000,'2025-06-01'),(2,12,'Laptop v+ís+írl+ís',500000,150000,'2025-09-01');
/*!40000 ALTER TABLE `Cel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Felhasznalo`
--

DROP TABLE IF EXISTS `Felhasznalo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Felhasznalo` (
  `felhasznalo_id` int NOT NULL AUTO_INCREMENT,
  `nev` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `jelszo` varchar(255) NOT NULL,
  `szerepkor_id` int NOT NULL,
  PRIMARY KEY (`felhasznalo_id`),
  UNIQUE KEY `email` (`email`),
  KEY `szerepkor_id` (`szerepkor_id`),
  CONSTRAINT `Felhasznalo_ibfk_1` FOREIGN KEY (`szerepkor_id`) REFERENCES `Szerepkor` (`szerepkor_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Felhasznalo`
--

LOCK TABLES `Felhasznalo` WRITE;
/*!40000 ALTER TABLE `Felhasznalo` DISABLE KEYS */;
INSERT INTO `Felhasznalo` VALUES (12,'Teszt Elek','teszt@gmail.com','3234424ea9a83431a14dda868bd8a9d686e0f18d9af680dcca676d3b7c19fd38',1),(15,'Teszt Elek','teszt1@gmail.com','a6acd658255131b4afb64b2f733aac0aa5fb374bc4eb4b5e0176de2952e05455',1),(18,'asdasdsad','asdada','b1cf2680221434822dc8c3198902b5aeb1f0e2bad32fa358962b4fbf0a499065',2),(19,'1','1','1d5d790d617c4f53235207b18efb4521fde10fb13fc6e9f74d2979dbb5c370ff',2);
/*!40000 ALTER TABLE `Felhasznalo` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `insert_user` BEFORE INSERT ON `Felhasznalo` FOR EACH ROW SET NEW.jelszo = pwd_encrypt(NEW.jelszo) */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Kategoria`
--

DROP TABLE IF EXISTS `Kategoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Kategoria` (
  `kategoria_id` int NOT NULL AUTO_INCREMENT,
  `kategoria_nev` varchar(100) NOT NULL,
  `tipus` enum('bevetel','kiadas') NOT NULL,
  PRIMARY KEY (`kategoria_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Kategoria`
--

LOCK TABLES `Kategoria` WRITE;
/*!40000 ALTER TABLE `Kategoria` DISABLE KEYS */;
INSERT INTO `Kategoria` VALUES (1,'Fizet+ês','bevetel'),(2,'Aj+índ+êk','bevetel'),(3,'+ëtel','kiadas'),(4,'Lakb+êr','kiadas'),(5,'Sz+-rakoz+ís','kiadas');
/*!40000 ALTER TABLE `Kategoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Szerepkor`
--

DROP TABLE IF EXISTS `Szerepkor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Szerepkor` (
  `szerepkor_id` int NOT NULL AUTO_INCREMENT,
  `szerepkor_nev` varchar(50) NOT NULL,
  PRIMARY KEY (`szerepkor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Szerepkor`
--

LOCK TABLES `Szerepkor` WRITE;
/*!40000 ALTER TABLE `Szerepkor` DISABLE KEYS */;
INSERT INTO `Szerepkor` VALUES (1,'admin'),(2,'user');
/*!40000 ALTER TABLE `Szerepkor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tranzakcio`
--

DROP TABLE IF EXISTS `Tranzakcio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
  CONSTRAINT `Tranzakcio_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `Felhasznalo` (`felhasznalo_id`) ON DELETE CASCADE,
  CONSTRAINT `Tranzakcio_ibfk_2` FOREIGN KEY (`kategoria_id`) REFERENCES `Kategoria` (`kategoria_id`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tranzakcio`
--

LOCK TABLES `Tranzakcio` WRITE;
/*!40000 ALTER TABLE `Tranzakcio` DISABLE KEYS */;
INSERT INTO `Tranzakcio` VALUES (1,12,1,350000,'2024-10-01','bevetel'),(2,12,3,12000,'2024-10-02','kiadas'),(3,12,4,150000,'2024-10-03','kiadas'),(4,12,5,8000,'2024-10-05','kiadas'),(6,12,3,8000,'2024-10-05','bevetel'),(7,12,1,350000,'2024-10-01','bevetel'),(8,12,3,12000,'2024-10-02','kiadas'),(9,12,4,150000,'2024-10-03','kiadas'),(10,12,4,150000,'2024-10-03','kiadas'),(11,12,5,8000,'2024-10-05','kiadas'),(12,12,3,243,'2025-12-29','kiadas');
/*!40000 ALTER TABLE `Tranzakcio` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-21 17:04:17

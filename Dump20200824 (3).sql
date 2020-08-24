-- MySQL dump 10.13  Distrib 8.0.17, for macos10.14 (x86_64)
--
-- Host: localhost    Database: voting-app
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `choice_table`
--

DROP TABLE IF EXISTS `choice_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `choice_table` (
  `choice_id` int NOT NULL AUTO_INCREMENT,
  `question_id` int NOT NULL,
  `choice` varchar(1000) NOT NULL,
  `vote_count` int NOT NULL,
  PRIMARY KEY (`choice_id`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `choice_table`
--

LOCK TABLES `choice_table` WRITE;
/*!40000 ALTER TABLE `choice_table` DISABLE KEYS */;
INSERT INTO `choice_table` VALUES (70,54,'McDonald\'s',1),(71,54,'Subway',2),(72,54,'Burger king',0),(73,55,'Switzerland',1),(74,55,'Norway',0),(75,55,'Italy',2),(76,55,'Spain',1),(77,56,'Hockey',1),(78,56,'Base ball',0);
/*!40000 ALTER TABLE `choice_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions_table`
--

DROP TABLE IF EXISTS `questions_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions_table` (
  `question_id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(1000) NOT NULL,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions_table`
--

LOCK TABLES `questions_table` WRITE;
/*!40000 ALTER TABLE `questions_table` DISABLE KEYS */;
INSERT INTO `questions_table` VALUES (54,'Which restaurant is good?','open'),(55,'Which of the below country is most beautiful?','open'),(56,'Which sports do you like most','close');
/*!40000 ALTER TABLE `questions_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'voting-app'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-24 13:23:36

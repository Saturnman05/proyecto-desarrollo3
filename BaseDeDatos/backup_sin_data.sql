-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: core_db
-- ------------------------------------------------------
-- Server version	8.0.39

CREATE DATABASE core_db;
USE core_db;

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
-- Table structure for table `actions`
--

DROP TABLE IF EXISTS `actions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actions` (
  `action_id` int NOT NULL AUTO_INCREMENT,
  `action_name` varchar(20) NOT NULL,
  PRIMARY KEY (`action_id`),
  UNIQUE KEY `action_name` (`action_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actions`
--

LOCK TABLES `actions` WRITE;
/*!40000 ALTER TABLE `actions` DISABLE KEYS */;
INSERT INTO `actions` VALUES (1,'CREATE PRODUCT'),(4,'DELETE PRODUCT'),(3,'UPDATE PRODUCT');
/*!40000 ALTER TABLE `actions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auditoria`
--

DROP TABLE IF EXISTS `auditoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auditoria` (
  `auditoria_id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `action_id` int NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`auditoria_id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `action_id` (`action_id`),
  CONSTRAINT `auditoria_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`user_id`),
  CONSTRAINT `auditoria_ibfk_2` FOREIGN KEY (`action_id`) REFERENCES `actions` (`action_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auditoria`
--

LOCK TABLES `auditoria` WRITE;
/*!40000 ALTER TABLE `auditoria` DISABLE KEYS */;
/*!40000 ALTER TABLE `auditoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrito`
--

DROP TABLE IF EXISTS `carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito` (
  `carrito_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  PRIMARY KEY (`carrito_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
INSERT INTO `carrito` VALUES (2,2),(7,38),(8,39);
/*!40000 ALTER TABLE `carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrito_producto`
--

DROP TABLE IF EXISTS `carrito_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito_producto` (
  `carrito_id` int NOT NULL,
  `product_id` int NOT NULL,
  `product_amount` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`carrito_id`,`product_id`),
  KEY `carrito_producto_ibfk_2` (`product_id`),
  CONSTRAINT `carrito_producto_ibfk_1` FOREIGN KEY (`carrito_id`) REFERENCES `carrito` (`carrito_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `carrito_producto_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `productos` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito_producto`
--

LOCK TABLES `carrito_producto` WRITE;
/*!40000 ALTER TABLE `carrito_producto` DISABLE KEYS */;
INSERT INTO `carrito_producto` VALUES (7,5,1);
/*!40000 ALTER TABLE `carrito_producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factura_producto`
--

DROP TABLE IF EXISTS `factura_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `factura_producto` (
  `factura_id` int NOT NULL,
  `product_id` int NOT NULL,
  `product_amount` int NOT NULL DEFAULT (0),
  `product_unit_price` decimal(18,2) NOT NULL DEFAULT (0),
  PRIMARY KEY (`factura_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `factura_producto_ibfk_1` FOREIGN KEY (`factura_id`) REFERENCES `facturas` (`factura_id`),
  CONSTRAINT `factura_producto_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `productos` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factura_producto`
--

LOCK TABLES `factura_producto` WRITE;
/*!40000 ALTER TABLE `factura_producto` DISABLE KEYS */;
INSERT INTO `factura_producto` VALUES (13,2,1,0.00),(13,3,1,10.00),(14,2,0,0.00),(14,4,2,20.00),(15,3,5,10.00),(15,6,5,20.00),(16,3,5,10.00),(16,6,5,20.00),(17,3,5,10.00),(17,4,2,20.00),(18,3,5,10.00),(18,6,5,20.00),(19,3,5,10.00),(19,6,5,20.00),(20,3,4,10.00),(20,6,4,20.00),(21,3,3,10.00),(21,6,3,20.00),(22,3,2,10.00),(22,6,3,20.00),(23,3,1,10.00),(23,6,3,20.00),(24,5,3,20.00),(25,4,2,20.00),(26,6,2,20.00),(27,4,1,20.00),(27,5,2,20.00),(27,6,1,20.00),(28,4,1,20.00),(28,5,2,20.00),(28,6,1,20.00),(29,4,1,20.00),(29,5,2,20.00),(29,6,1,20.00),(30,4,1,20.00),(30,5,2,20.00),(30,6,1,20.00),(31,4,1,20.00),(31,5,2,20.00),(31,6,1,20.00);
/*!40000 ALTER TABLE `factura_producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facturas`
--

DROP TABLE IF EXISTS `facturas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facturas` (
  `factura_id` int NOT NULL AUTO_INCREMENT,
  `rnc` varchar(11) DEFAULT NULL,
  `emission_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total_price` decimal(18,2) NOT NULL DEFAULT (0),
  `user_id` int NOT NULL,
  PRIMARY KEY (`factura_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `facturas_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facturas`
--

LOCK TABLES `facturas` WRITE;
/*!40000 ALTER TABLE `facturas` DISABLE KEYS */;
INSERT INTO `facturas` VALUES (13,'12345678910','2024-07-31 06:25:03',50.00,2),(14,'101160952','2024-09-25 16:14:41',40.00,2),(15,'101160952','2024-09-25 16:32:13',150.00,2),(16,'1111111','2024-09-25 17:25:25',150.00,2),(17,'111111111','2024-09-25 17:31:20',90.00,2),(18,'1111111111','2024-09-27 20:35:44',150.00,2),(19,'1111111111','2024-09-27 20:36:25',150.00,2),(20,'111111','2024-09-27 20:38:48',120.00,2),(21,'645643','2024-09-27 20:40:33',90.00,2),(22,'5435435','2024-09-27 20:40:57',80.00,2),(23,'5435435','2024-09-27 20:41:15',70.00,2),(24,'12334','2024-09-27 20:51:11',60.00,2),(25,'5454','2024-09-27 20:53:00',40.00,2),(26,'11111111','2024-09-27 21:05:28',40.00,2),(27,'111111111','2024-09-27 21:13:40',80.00,2),(28,'1111','2024-09-27 21:17:54',80.00,2),(29,'1111','2024-09-27 21:19:12',80.00,2),(30,'1111','2024-09-27 21:19:40',80.00,2),(31,'40209873641','2024-09-27 21:20:55',80.00,2);
/*!40000 ALTER TABLE `facturas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `unit_price` decimal(18,2) NOT NULL DEFAULT (0),
  `stock` int NOT NULL DEFAULT (0),
  `date_created` timestamp NOT NULL DEFAULT (now()),
  `image_url` varchar(200) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `description` (`description`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (2,'prueba','prueba de post',2.00,2,'2024-07-18 16:22:02','https://i.pinimg.com/236x/fa/42/f5/fa42f593218b979dcdf0bb1d134b92ec.jpg',2),(3,'creatina','creatina de greg doucette',15.00,3,'2024-07-31 06:03:28','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgwQWqjRtAMTivXU3yJE3ZF_tGjzSA2uBlLg&s',2),(4,'string','string',20.00,2,'2024-09-25 14:22:46','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwf86JknlrT5C4ADgDN6MamGQ0O2YuvnsPag&s',38),(5,'foo','foo faiters imagen',20.00,1,'2024-09-25 14:31:23','https://cdn-p.smehost.net/sites/005297e5d91d4996984e966fac4389ea/wp-content/uploads/2017/06/00c04d57e42c56f9116eef3f1df14d53-800x800.jpg',38),(6,'iphone 4','El iPhone 4 fue un teléfono inteligente de gama alta, presentado como la cuarta generación de iPhone el 24 de junio de 2010. Originalmente, Apple solo lo ofrecía en color negro y blanco.',20.00,1,'2024-09-25 16:19:13','https://th.bing.com/th/id/OIP.pqGrpoKtLGiSa9hNdytXFQHaGg?rs=1&pid=ImgDetMain',19);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol_actions`
--

DROP TABLE IF EXISTS `rol_actions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol_actions` (
  `rol_id` int NOT NULL,
  `action_id` int NOT NULL,
  PRIMARY KEY (`rol_id`,`action_id`),
  KEY `action_id` (`action_id`),
  CONSTRAINT `rol_actions_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`rol_id`),
  CONSTRAINT `rol_actions_ibfk_2` FOREIGN KEY (`action_id`) REFERENCES `actions` (`action_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol_actions`
--

LOCK TABLES `rol_actions` WRITE;
/*!40000 ALTER TABLE `rol_actions` DISABLE KEYS */;
INSERT INTO `rol_actions` VALUES (1,1),(1,4);
/*!40000 ALTER TABLE `rol_actions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `rol_id` int NOT NULL AUTO_INCREMENT,
  `rol_name` varchar(20) NOT NULL,
  PRIMARY KEY (`rol_id`),
  UNIQUE KEY `rol_name` (`rol_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ADMIN'),(2,'CLIENTE');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `full_name` varchar(140) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rol_id` int NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT (now()),
  `last_login` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  KEY `rol_id` (`rol_id`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`rol_id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (2,'fmn','fran1412','Francisco Madera Natera','franciscomaderanatera@gmail.com',1,'2024-07-23 05:17:01','2024-07-23 05:17:01'),(19,'jade123','verynice','Jade Estevez','pupu@gmail.com',2,'2024-09-14 21:18:13','2024-09-14 21:18:13'),(38,'foo','1234','foo bar baz','bar',2,'2024-09-18 16:57:37','2024-09-18 16:57:37'),(39,'usuarioConCarrito','1234','Usuario Con Carrito','test@mail.com',2,'2024-09-18 17:06:10','2024-09-18 17:06:10');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'core_db'
--
/*!50003 DROP FUNCTION IF EXISTS `fnSelectActionId` */;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `fnSelectActionId`(pp_action_name VARCHAR(20)) RETURNS int
    DETERMINISTIC
BEGIN
	DECLARE new_action_id INT;
	SET new_action_id = (SELECT action_id FROM actions WHERE action_name = pp_action_name COLLATE utf8mb4_unicode_ci);
    RETURN new_action_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
/*!50003 DROP FUNCTION IF EXISTS `fnSelectRolId` */;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `fnSelectRolId`(pp_rol_name VARCHAR(20)) RETURNS int
    DETERMINISTIC
BEGIN
	DECLARE new_rol_id INT;
    SET new_rol_id = (SELECT rol_id FROM roles WHERE rol_name = pp_rol_name COLLATE utf8mb4_unicode_ci);
    RETURN new_rol_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
/*!50003 DROP FUNCTION IF EXISTS `fnSelectUserId` */;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `fnSelectUserId`(pp_username VARCHAR(50)) RETURNS int
    DETERMINISTIC
BEGIN
	DECLARE new_user_id INT;
    SET new_user_id = (SELECT user_id FROM usuarios WHERE username = pp_username);
	RETURN new_user_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `ppAddProductosToFactura` */;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ppAddProductosToFactura`(
	IN pp_factura_id INT,
    IN pp_product_id INT,
    IN pp_product_amount INT,
    IN pp_product_unit_price DECIMAL(18,2)
)
BEGIN
	INSERT INTO factura_producto (factura_id, product_id, product_amount, product_unit_price)
    VALUES (pp_factura_id, pp_product_id, pp_product_amount, pp_product_unit_price);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `ppAddProductToCarrito` */;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ppAddProductToCarrito`(
	IN pp_carrito_id INT,
	IN pp_product_id INT
)
BEGIN
	DECLARE current_product_amount INT DEFAULT 0;
    
    SELECT product_amount INTO current_product_amount
    FROM carrito_producto
    WHERE carrito_id = pp_carrito_id AND product_id = pp_product_id;
    
    IF current_product_amount = 0 THEN
		INSERT INTO carrito_producto (carrito_id, product_id, product_amount)
        VALUES (pp_carrito_id, pp_product_id, 1);
	ELSE
		UPDATE carrito_producto
        SET product_amount = current_product_amount + 1
        WHERE carrito_id = pp_carrito_id AND product_id = pp_product_id;
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `ppDeleteCarrito` */;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ppDeleteCarrito`(
	IN pp_carrito_id INT
)
BEGIN
	DELETE FROM carrito WHERE carrito_id = pp_carrito_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `ppDeleteFactura` */;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ppDeleteFactura`(
    IN pp_factura_id INT
)
BEGIN
    -- Iniciar transacción
    START TRANSACTION;

    -- Eliminar productos asociados a la factura
    DELETE FROM factura_producto WHERE factura_id = pp_factura_id;

    -- Eliminar la factura
    DELETE FROM facturas WHERE factura_id = pp_factura_id;

    -- Confirmar transacción
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `ppDeleteProduct` */;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ppDeleteProduct`(
	IN pp_product_id INT,
    IN pp_carrito_id INT
)
BEGIN
	IF pp_carrito_id IS NULL THEN
		DELETE FROM productos WHERE product_id = pp_product_id;
	ELSE
		DELETE FROM carrito_producto WHERE carrito_id = pp_carrito_id AND product_id = pp_product_id;
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `ppDeleteUsuario` */;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ppDeleteUsuario`(
	IN pp_user_id INT
)
BEGIN
	DELETE FROM usuarios WHERE user_id = pp_user_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `ppInsertCarrito` */;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ppInsertCarrito`(
	IN pp_user_id INT
)
BEGIN
	INSERT INTO carrito (user_id) VALUES (pp_user_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `ppInsertFactura` */;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ppInsertFactura`(
	IN pp_rnc VARCHAR(11),
    IN pp_total_price DECIMAL(18,2),
    IN pp_user_id INT,
    OUT new_factura_id INT
)
BEGIN
	INSERT INTO facturas (rnc, total_price, user_id)
    VALUES (pp_rnc, pp_total_price, pp_user_id);
    
    SET new_factura_id = last_insert_id();
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `ppInsertProduct` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ppInsertProduct`(
	IN pp_name VARCHAR(100),
    IN pp_description VARCHAR(500),
    IN pp_product_image VARCHAR(200),
    IN pp_unit_price DECIMAL(18,2),
    IN pp_stock INT,
    IN pp_user_id INT
)
BEGIN
	INSERT INTO productos (name, description, image_url, unit_price, stock, user_id)
    VALUES (pp_name, pp_description, pp_product_image, pp_unit_price, pp_stock, pp_user_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ppInsertRolAction` */;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ppInsertRolAction`(
	IN pp_rol_id INT,
    IN pp_action_id INT
)
BEGIN
	INSERT INTO rol_actions (rol_id, action_id) VALUES (pp_rol_id, pp_action_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `ppLogInUser` */;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ppLogInUser`(
    IN pp_username VARCHAR(50),
    IN pp_password VARCHAR(50)
)
BEGIN
    SELECT 
		u.*,
        r.rol_name
    FROM usuarios u
    JOIN roles r ON u.rol_id = r.rol_id
    WHERE `username` = CONVERT(pp_username USING utf8mb4) COLLATE utf8mb4_unicode_ci
    AND `password` = CONVERT(pp_password USING utf8mb4) COLLATE utf8mb4_unicode_ci;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `ppSelectActions` */;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ppSelectActions`(
	IN pp_action_id INT,
    IN pp_rol_id INT
)
BEGIN
	IF pp_action_id IS NULL AND pp_rol_id IS NULL THEN
		SELECT * FROM actions;
	ELSE
		IF pp_rol_id IS NULL THEN
			SELECT * FROM actions WHERE action_id = pp_action_id;
		ELSE
			SELECT a.*
            FROM actions a
            JOIN rol_actions ra ON a.action_id = ra.action_id
            WHERE ra.rol_id = pp_rol_id;
		END IF;
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `ppSelectCarrito` */;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ppSelectCarrito`(
	IN pp_carrito_id INT,
    IN pp_user_id INT
)
BEGIN
	IF pp_user_id IS NULL THEN
		SELECT * FROM carrito WHERE carrito_id = pp_carrito_id;
	ELSE
		SELECT * FROM carrito WHERE user_id = pp_user_id;
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `ppSelectFacturas` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ppSelectFacturas`(
	IN pp_factura_id INT,
    IN pp_user_id INT
)
BEGIN
	IF pp_factura_id IS NOT NULL THEN
			SELECT 
				f.*,
				p.name AS 'product_name',
				pf.product_id,
				pf.product_amount,
				pf.product_unit_price
			FROM facturas f
			JOIN factura_producto pf ON f.factura_id = pf.factura_id
			JOIN productos p ON pf.product_id = p.product_id 
            WHERE f.factura_id = pp_factura_id;
	ELSEIF pp_user_id IS NOT NULL THEN
		SELECT
			f.*,
			p.name AS 'product_name',
			pf.product_id,
			pf.product_amount,
			pf.product_unit_price
		FROM facturas f
		JOIN factura_producto pf ON f.factura_id = pf.factura_id
		JOIN productos p ON pf.product_id = p.product_id 
		WHERE f.user_id = pp_user_id ORDER BY f.factura_id;
    ELSE
		SELECT 
			f.*,
			p.name AS 'product_name',
			pf.product_id,
			pf.product_amount,
			pf.product_unit_price
		FROM facturas f
		JOIN factura_producto pf ON f.factura_id = pf.factura_id
		JOIN productos p ON pf.product_id = p.product_id ORDER BY f.factura_id;
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ppSelectProducts` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ppSelectProducts`(
	IN pp_product_id INT,
    IN pp_name VARCHAR(100),
    IN pp_carrito_id INT,
    IN pp_user_id INT
)
BEGIN
	IF pp_product_id IS NULL AND pp_name IS NULL AND pp_carrito_id IS NULL AND pp_user_id IS NULL THEN
		SELECT * FROM productos;
	ELSEIF pp_name IS NULL AND pp_carrito_id IS NULL AND pp_user_id IS NULL THEN
		SELECT * FROM productos WHERE product_id = pp_product_id;
	ELSEIF pp_carrito_id IS NULL AND pp_user_id IS NULL THEN
		SELECT * FROM productos WHERE `name` COLLATE utf8mb4_unicode_ci = pp_name COLLATE utf8mb4_unicode_ci;
	ELSEIF pp_user_id IS NULL THEN
		SELECT p.*
		FROM carrito_producto cp
		JOIN productos p ON cp.product_id = p.product_id
		WHERE cp.carrito_id = pp_carrito_id;
	ELSE
		SELECT p.*
		FROM productos p
		WHERE p.user_id = pp_user_id;
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ppSelectProductsFromFactura` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ppSelectProductsFromFactura`(
	IN pp_factura_id INT
)
BEGIN
	SELECT * FROM factura_producto WHERE factura_id = pp_factura_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ppSelectRoles` */;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ppSelectRoles`(
	IN pp_rol_id INT,
    IN pp_user_id INT
)
BEGIN
	DECLARE user_rol_id INT;

	IF pp_rol_id IS NULL AND pp_user_id IS NULL THEN
		SELECT * FROM roles;
	ELSE
		IF pp_user_id IS NULL THEN
			SELECT * FROM roles WHERE rol_id = pp_rol_id;
		ELSE
			SELECT rol_id INTO user_rol_id 
            FROM usuarios 
            WHERE user_id = pp_user_id;
            
            SELECT * FROM roles WHERE rol_id = user_rol_id;
		END IF;
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `ppSelectUsers` */;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ppSelectUsers`(
	IN pp_user_id INT
)
BEGIN
	IF pp_user_id IS NULL THEN
		SELECT 
			u.*,
            r.rol_name
		FROM usuarios u
        JOIN roles r ON u.rol_id = r.rol_id;
	ELSE
		SELECT 
			u.*,
            r.rol_name
		FROM usuarios u
        JOIN roles r ON u.rol_id = r.rol_id
        WHERE u.user_id = pp_user_id;
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `ppUpdateFactura` */;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ppUpdateFactura`(
    IN pp_factura_id INT,
    IN pp_rnc VARCHAR(11),
    IN pp_total_price DECIMAL(18,2),
    IN pp_user_id INT,
    IN pp_productos JSON
)
BEGIN
    DECLARE i INT DEFAULT 0;
    DECLARE pp_product_name VARCHAR(255);
    DECLARE pp_product_id INT;
    DECLARE pp_product_amount INT DEFAULT 1;
    DECLARE pp_product_unit_price DECIMAL(18,2) DEFAULT 0.00;

    START TRANSACTION;

    -- Actualizar la factura
    UPDATE facturas
    SET rnc = pp_rnc,
        total_price = pp_total_price,
        user_id = pp_user_id
    WHERE factura_id = pp_factura_id;

    -- Eliminar los productos existentes de la factura
    DELETE FROM factura_producto WHERE factura_id = pp_factura_id;

    -- Agregar nuevos productos a la factura
    WHILE i < JSON_LENGTH(pp_productos) DO
        SET pp_product_name = JSON_UNQUOTE(JSON_EXTRACT(pp_productos, CONCAT('$[', i, '].Name')));
        SET pp_product_amount = JSON_UNQUOTE(JSON_EXTRACT(pp_productos, CONCAT('$[', i, '].Amount')));
        SET pp_product_unit_price = JSON_UNQUOTE(JSON_EXTRACT(pp_productos, CONCAT('$[', i, '].UnitPrice')));

        -- Buscar el ID del producto por nombre, forzando la collation
        SELECT product_id INTO pp_product_id 
        FROM productos 
        WHERE `name` COLLATE utf8mb4_unicode_ci = pp_product_name COLLATE utf8mb4_unicode_ci;

        -- Asegurarse de que el producto fue encontrado
        IF pp_product_id IS NOT NULL THEN
            INSERT INTO factura_producto (factura_id, product_id, product_amount, product_unit_price)
            VALUES (pp_factura_id, pp_product_id, pp_product_amount, pp_product_unit_price);
        END IF;

        SET i = i + 1;
    END WHILE;

    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `ppUpdateProduct` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ppUpdateProduct`(
	IN pp_product_id INT,
	IN pp_name VARCHAR(100),
    IN pp_description VARCHAR(500),
    IN pp_product_image VARCHAR(200),
    IN pp_unit_price DECIMAL(18,2),
    IN pp_stock INT,
    IN pp_user_id INT
)
BEGIN
	UPDATE productos
    SET name = pp_name, 
        description = pp_description, 
        image_url = pp_product_image, 
        unit_price = pp_unit_price,
        stock = pp_stock,
        user_id = pp_user_id
    WHERE product_id = pp_product_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ppUpsertAction` */;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ppUpsertAction`(
	IN pp_action_id INT,
    IN pp_action_name VARCHAR(20)
)
BEGIN
	IF pp_action_id IS NULL THEN
		INSERT INTO actions (action_name) VALUES (pp_action_name);
	ELSE
		UPDATE actions SET action_name = pp_action_name WHERE pp_action_id = action_id;
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `ppUpsertRol` */;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ppUpsertRol`(
	IN pp_rol_id INT,
    IN pp_rol_name VARCHAR(20)
)
BEGIN
	IF pp_rol_id IS NULL THEN
		INSERT INTO roles (rol_name) VALUES (pp_rol_name);
	ELSE
		UPDATE roles SET rol_name = pp_rol_name WHERE pp_rol_id = rol_id;
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `core_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `ppUpsertUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ppUpsertUsuario`(
    IN pp_user_id INT,
    IN pp_username VARCHAR(50),
    IN pp_password VARCHAR(50),
    IN pp_email VARCHAR(200),
    IN pp_rol_id INT,
    IN pp_full_name VARCHAR(140)
)
BEGIN
    IF pp_user_id IS NULL THEN
        INSERT INTO usuarios (username, password, email, rol_id, full_name)
        VALUES (
            CONVERT(pp_username USING utf8mb4) COLLATE utf8mb4_0900_ai_ci,
            CONVERT(pp_password USING utf8mb4) COLLATE utf8mb4_0900_ai_ci,
            CONVERT(pp_email USING utf8mb4) COLLATE utf8mb4_0900_ai_ci, 
            pp_rol_id,
            CONVERT(pp_full_name USING utf8mb4) COLLATE utf8mb4_0900_ai_ci
        );
        
        SELECT user_id FROM usuarios WHERE 
			username = CONVERT(pp_username USING utf8mb4) COLLATE utf8mb4_0900_ai_ci 
			AND password = CONVERT(pp_password USING utf8mb4) COLLATE utf8mb4_0900_ai_ci;

    ELSE
        UPDATE usuarios
        SET 
            username = CONVERT(pp_username USING utf8mb4) COLLATE utf8mb4_0900_ai_ci,
            password = CONVERT(pp_password USING utf8mb4) COLLATE utf8mb4_0900_ai_ci,
            email = CONVERT(pp_email USING utf8mb4) COLLATE utf8mb4_0900_ai_ci,
            rol_id = pp_rol_id,
            full_name = CONVERT(pp_full_name USING utf8mb4) COLLATE utf8mb4_0900_ai_ci
        WHERE user_id = pp_user_id;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-18 20:33:11

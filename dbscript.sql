-- MySQL Script generated by MySQL Workbench
-- Wed Oct 16 16:48:20 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema managemart
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema managemart
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `managemart` DEFAULT CHARACTER SET utf8 ;
USE `managemart` ;

-- -----------------------------------------------------
-- Table `managemart`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `managemart`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `productBarcode` VARCHAR(100) NOT NULL UNIQUE,
  `productName` VARCHAR(100) NOT NULL,
  `productCost` DECIMAL(9,2) NOT NULL,
  `productPrice` DECIMAL(9,2) NOT NULL,
  `productQuantity` INT NOT NULL,
  `productImage` VARCHAR(100) NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

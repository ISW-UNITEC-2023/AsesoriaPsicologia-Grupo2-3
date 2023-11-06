-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema attention_sys
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema attention_sys
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `attention_sys` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `attention_sys` ;

-- -----------------------------------------------------
-- Table `attention_sys`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `attention_sys`.`users` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `name_user` VARCHAR(45) NOT NULL,
  `email_user` VARCHAR(50) NOT NULL,
  `number_user` VARCHAR(12) NOT NULL,
  `password_user` VARCHAR(200) NOT NULL,
  `salt_user` VARCHAR(200) NOT NULL,
  `active_user` TINYINT(1) NOT NULL,
  `creation_date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_user`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `attention_sys`.`announces`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `attention_sys`.`announces` (
  `id_announce` INT NOT NULL AUTO_INCREMENT,
  `title_announce` VARCHAR(100) NOT NULL,
  `message_announce` VARCHAR(400) NOT NULL,
  `id_sender` INT NOT NULL,
  `creation_date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_announce`),
  INDEX `fk_announces_users_idx` (`id_sender` ASC) VISIBLE,
  CONSTRAINT `fk_announces_users`
    FOREIGN KEY (`id_sender`)
    REFERENCES `attention_sys`.`users` (`id_user`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `attention_sys`.`courses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `attention_sys`.`courses` (
  `id_course` INT NOT NULL,
  `id_teacher` INT NOT NULL,
  `name_course` VARCHAR(80) NOT NULL,
  `description_course` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`id_course`),
  INDEX `fk_courses_users_idx` (`id_teacher` ASC) VISIBLE,
  CONSTRAINT `fk_courses_users`
    FOREIGN KEY (`id_teacher`)
    REFERENCES `attention_sys`.`users` (`id_user`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `attention_sys`.`sections`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `attention_sys`.`sections` (
  `id_section` INT NOT NULL,
  `id_course` INT NOT NULL,
  `id_psychologist` INT NULL DEFAULT NULL,
  `year` INT NOT NULL,
  `quarter` INT NOT NULL,
  `color` VARCHAR(7) NOT NULL,
  PRIMARY KEY (`id_section`),
  INDEX `fk_course_section_idx` (`id_course` ASC) VISIBLE,
  INDEX `fk_section_user_idx` (`id_psychologist` ASC) VISIBLE,
  CONSTRAINT `fk_section_course`
    FOREIGN KEY (`id_course`)
    REFERENCES `attention_sys`.`courses` (`id_course`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_section_user`
    FOREIGN KEY (`id_psychologist`)
    REFERENCES `attention_sys`.`users` (`id_user`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `attention_sys`.`pacients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `attention_sys`.`pacients` (
  `id_pacient` INT NOT NULL,
  `id_section` INT NOT NULL,
  INDEX `fk_sections_users_idx` (`id_pacient` ASC) VISIBLE,
  INDEX `fk_pacient_sections_idx` (`id_section` ASC) VISIBLE,
  PRIMARY KEY (`id_pacient`, `id_section`),
  CONSTRAINT `fk_pacient_sections`
    FOREIGN KEY (`id_section`)
    REFERENCES `attention_sys`.`sections` (`id_section`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_sections_pacient`
    FOREIGN KEY (`id_pacient`)
    REFERENCES `attention_sys`.`users` (`id_user`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `attention_sys`.`proceedings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `attention_sys`.`proceedings` (
  `id_proceeding` VARCHAR(36) NOT NULL,
  `id_pacient` INT NOT NULL,
  `id_creator` INT NOT NULL,
  `url_proceeding` VARCHAR(300) NOT NULL,
  `creation_date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_proceeding`),
  INDEX `fk_proceedings_users_idx` (`id_pacient` ASC) VISIBLE,
  INDEX `fk_proceedings_idx` (`id_creator` ASC) VISIBLE,
  CONSTRAINT `fk_proceedings`
    FOREIGN KEY (`id_creator`)
    REFERENCES `attention_sys`.`users` (`id_user`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_proceedings_users`
    FOREIGN KEY (`id_pacient`)
    REFERENCES `attention_sys`.`users` (`id_user`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `attention_sys`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `attention_sys`.`roles` (
  `id_role` INT NOT NULL AUTO_INCREMENT,
  `name_role` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_role`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `attention_sys`.`user_rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `attention_sys`.`user_rol` (
  `id_user` INT NOT NULL,
  `id_rol` INT NOT NULL,
  PRIMARY KEY (`id_user`, `id_rol`),
  INDEX `fk_rol_user_idx` (`id_rol` ASC) VISIBLE,
  CONSTRAINT `fk_rol_user`
    FOREIGN KEY (`id_rol`)
    REFERENCES `attention_sys`.`roles` (`id_role`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_rol`
    FOREIGN KEY (`id_user`)
    REFERENCES `attention_sys`.`users` (`id_user`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `attention_sys`.`announces_sections`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `attention_sys`.`announces_sections` (
  `id_announces` INT NOT NULL,
  `id_section` INT NOT NULL,
  PRIMARY KEY (`id_announces`, `id_section`),
  INDEX `fk_section_announuce_idx` (`id_section` ASC) VISIBLE,
  CONSTRAINT `fk_announce_section`
    FOREIGN KEY (`id_announces`)
    REFERENCES `attention_sys`.`announces` (`id_announce`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_section_announuce`
    FOREIGN KEY (`id_section`)
    REFERENCES `attention_sys`.`sections` (`id_section`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

CREATE TABLE `kgrantdatabase`.`mygrant` (
`id` INT NOT NULL AUTO_INCREMENT ,
`title` VARCHAR(45) NOT NULL ,
`amount` VARCHAR(45) NOT NULL ,
`designation` VARCHAR(45) NOT NULL ,
`org` VARCHAR(45) NOT NULL ,
`comments` TEXT NOT NULL ,
`status` VARCHAR(10) NOT NULL DEFAULT 'active' , PRIMARY KEY (`id`)) ENGINE = InnoDB;
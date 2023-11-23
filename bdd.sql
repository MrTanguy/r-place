CREATE TABLE `r-place`.`pixel` (
    `id` INT NOT NULL AUTO_INCREMENT , 
    `position` VARCHAR(255) NOT NULL , 
    `color` VARCHAR(255) NOT NULL , 
    PRIMARY KEY (`id`), 
    UNIQUE (`position`)
) ENGINE = InnoDB;
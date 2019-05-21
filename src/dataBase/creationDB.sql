create database KNXData;


-- ************************************** `datapoints`

CREATE TABLE `datapoints`
(
 `DPTname`        varchar(45) NOT NULL ,
 `DPTvalueType`   varchar(45) NOT NULL ,
 `DPTdescription` varchar(255) ,
 `DPTnotes`       varchar(255) ,
 `DPTsupported`   tinyint(1) NOT NULL ,
PRIMARY KEY (`DTPname`)
);
-- ************************************** `connections`

CREATE TABLE `connections`
(
 `CONNipAddress`   varchar(45) NOT NULL ,
 `CONNipPort`      int NOT NULL ,
 `CONNphysAddress` varchar(45) NOT NULL ,
 `CONNminDelay`    int NOT NULL ,
PRIMARY KEY (`CONNipAddress`)
);


-- ************************************** `devices`

CREATE TABLE `devices`
(
 `DEVgroupAddress`  varchar(45) NOT NULL ,
 `DEVstatusAddress` varchar(45) NOT NULL ,
 `DEVdescription`   varchar(255) ,
 `DEVconnection`    varchar(45) NOT NULL ,
 `DEVdatapoint`     varchar(45) NOT NULL ,
PRIMARY KEY (`DEVgroupAddress`),
KEY `fkIdx_22` (`DEVdatapoint`),
CONSTRAINT `FK_22` FOREIGN KEY `fkIdx_22` (`DEVdatapoint`) REFERENCES `datapoints` (`DTPname`),
KEY `fkIdx_25` (`DEVconnection`),
CONSTRAINT `FK_25` FOREIGN KEY `fkIdx_25` (`DEVconnection`) REFERENCES `connections` (`CONNipAddress`)
);


-- ************************************** `processes`

CREATE TABLE `processes`
(
 `PROCid`        int unsigned NOT NULL AUTO_INCREMENT ,
 `PROCreadType`  varchar(45) NOT NULL ,
 `PROCcycleTime` int NOT NULL ,
 `PROCdevice`    varchar(45) NOT NULL ,
PRIMARY KEY (`PROCid`),
KEY `fkIdx_33` (`PROCdevice`),
CONSTRAINT `FK_33` FOREIGN KEY `fkIdx_33` (`PROCdevice`) REFERENCES `devices` (`DEVgroupAddress`)
);


-- ************************************** `information`

CREATE TABLE `information`
(
 `INFOid`     int unsigned NOT NULL AUTO_INCREMENT ,
 `INFOvalue`  varchar(255) NOT NULL ,
 `INFOdate`   datetime NOT NULL ,
 `INFOdevice` varchar(45) NOT NULL ,
PRIMARY KEY (`INFOid`),
KEY `fkIdx_41` (`INFOdevice`),
CONSTRAINT `FK_41` FOREIGN KEY `fkIdx_41` (`INFOdevice`) REFERENCES `devices` (`DEVgroupAddress`)
);




INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...); 

UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition; 

DELETE FROM table_name WHERE condition;




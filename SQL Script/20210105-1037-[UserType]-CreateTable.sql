CREATE TABLE `usertype` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Role` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Log_CreatedDate` datetime DEFAULT NULL,
  `Log_CreatedBy` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Log_UpdatedDate` datetime DEFAULT NULL,
  `Log_UpdatedBy` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `IsDeleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `user` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Password` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Email` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Log_CreatedDate` datetime DEFAULT NULL,
  `Log_CreatedBy` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Log_UpdatedDate` datetime DEFAULT NULL,
  `Log_UpdatedBy` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `IsDeleted` bit(1) NOT NULL DEFAULT b'0',
  `Role` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Username_UNIQUE` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

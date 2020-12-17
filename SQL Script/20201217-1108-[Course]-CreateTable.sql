CREATE TABLE `course` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Intro` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Description` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Rating` float DEFAULT NULL,
  `Image` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Price` float DEFAULT NULL,
  `Log_CreatedDate` datetime DEFAULT NULL,
  `Log_CreatedBy` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Log_UpdatedDate` datetime DEFAULT NULL,
  `Log_UpdatedBy` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `IsDeleted` bit(1) NOT NULL DEFAULT b'0',
  `IsAllowPreview` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

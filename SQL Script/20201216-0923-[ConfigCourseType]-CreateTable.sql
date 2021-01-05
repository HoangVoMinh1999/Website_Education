CREATE TABLE `configcoursetype` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Log_CreatedDate` datetime DEFAULT NULL,
  `Log_CreatedBy` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Log_UpdatedDate` datetime DEFAULT NULL,
  `Log_UpdatedBy` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `IsDeleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

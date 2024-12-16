-- CreateTable
CREATE TABLE `User` (
    `userKey` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NOT NULL,
    `userPassword` VARCHAR(191) NOT NULL,
    `userEmail` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `birth` DATETIME(3) NOT NULL,
    `role` VARCHAR(191) NULL,
    `mbti` ENUM('INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP') NULL,
    `token` VARCHAR(191) NULL,

    UNIQUE INDEX `User_userId_key`(`userId`),
    PRIMARY KEY (`userKey`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlantDict` (
    `dictKey` INTEGER NOT NULL AUTO_INCREMENT,
    `getDate` DATETIME(3) NOT NULL,
    `getPlace` VARCHAR(191) NOT NULL,
    `userKey` INTEGER NOT NULL,

    PRIMARY KEY (`dictKey`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlantDictPlantLink` (
    `linkKey` INTEGER NOT NULL AUTO_INCREMENT,
    `userKey` INTEGER NOT NULL,
    `plantKey` INTEGER NOT NULL,
    `plantDictDictKey` INTEGER NULL,

    PRIMARY KEY (`linkKey`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Plant` (
    `plantKey` INTEGER NOT NULL AUTO_INCREMENT,
    `plantName` VARCHAR(191) NOT NULL,
    `plantStatus` ENUM('Seed', 'Germination', 'Seedling', 'Mature') NOT NULL,

    PRIMARY KEY (`plantKey`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TaskTable` (
    `taskKey` INTEGER NOT NULL AUTO_INCREMENT,
    `taskName` VARCHAR(191) NOT NULL,
    `taskProgress` VARCHAR(191) NOT NULL,
    `taskStartDate` DATETIME(3) NOT NULL,
    `taskEndDate` DATETIME(3) NOT NULL,
    `userKey` INTEGER NOT NULL,
    `projectKey` INTEGER NOT NULL,
    `projectCalendarKey` INTEGER NULL,

    PRIMARY KEY (`taskKey`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectCalendar` (
    `memoKey` INTEGER NOT NULL AUTO_INCREMENT,
    `memoName` VARCHAR(191) NOT NULL,
    `calendarDate` DATETIME(3) NULL,
    `memo` VARCHAR(191) NOT NULL,
    `schedule` DATETIME(3) NOT NULL,
    `projectKey` INTEGER NOT NULL,
    `privateCalKey` INTEGER NULL,

    PRIMARY KEY (`memoKey`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectInfo` (
    `projectInfoKey` INTEGER NOT NULL AUTO_INCREMENT,
    `userKey` INTEGER NOT NULL,
    `projectKey` INTEGER NOT NULL,
    `importance` BOOLEAN NOT NULL,
    `authority` ENUM('ADMIN', 'MANAGER', 'MEMBER') NOT NULL,

    PRIMARY KEY (`projectInfoKey`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrivateCalendar` (
    `privateCalendarKey` INTEGER NOT NULL AUTO_INCREMENT,
    `userKey` INTEGER NOT NULL,
    `memo` VARCHAR(191) NOT NULL,
    `schedule` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PrivateCalendar_userKey_key`(`userKey`),
    PRIMARY KEY (`privateCalendarKey`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `projectKey` INTEGER NOT NULL AUTO_INCREMENT,
    `totalPeople` INTEGER NOT NULL,
    `totalProgress` INTEGER NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `projectName` VARCHAR(191) NOT NULL,
    `taskCount` INTEGER NOT NULL,
    `plantKey` INTEGER NULL,
    `privateCalKey` INTEGER NULL,
    `currentProgress` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`projectKey`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PlantDict` ADD CONSTRAINT `PlantDict_userKey_fkey` FOREIGN KEY (`userKey`) REFERENCES `User`(`userKey`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlantDictPlantLink` ADD CONSTRAINT `PlantDictPlantLink_userKey_fkey` FOREIGN KEY (`userKey`) REFERENCES `User`(`userKey`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlantDictPlantLink` ADD CONSTRAINT `PlantDictPlantLink_plantKey_fkey` FOREIGN KEY (`plantKey`) REFERENCES `Plant`(`plantKey`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlantDictPlantLink` ADD CONSTRAINT `PlantDictPlantLink_plantDictDictKey_fkey` FOREIGN KEY (`plantDictDictKey`) REFERENCES `PlantDict`(`dictKey`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskTable` ADD CONSTRAINT `TaskTable_userKey_fkey` FOREIGN KEY (`userKey`) REFERENCES `User`(`userKey`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskTable` ADD CONSTRAINT `TaskTable_projectKey_fkey` FOREIGN KEY (`projectKey`) REFERENCES `Project`(`projectKey`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskTable` ADD CONSTRAINT `TaskTable_projectCalendarKey_fkey` FOREIGN KEY (`projectCalendarKey`) REFERENCES `ProjectCalendar`(`memoKey`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectCalendar` ADD CONSTRAINT `ProjectCalendar_projectKey_fkey` FOREIGN KEY (`projectKey`) REFERENCES `Project`(`projectKey`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectCalendar` ADD CONSTRAINT `ProjectCalendar_privateCalKey_fkey` FOREIGN KEY (`privateCalKey`) REFERENCES `PrivateCalendar`(`privateCalendarKey`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectInfo` ADD CONSTRAINT `ProjectInfo_userKey_fkey` FOREIGN KEY (`userKey`) REFERENCES `User`(`userKey`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectInfo` ADD CONSTRAINT `ProjectInfo_projectKey_fkey` FOREIGN KEY (`projectKey`) REFERENCES `Project`(`projectKey`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrivateCalendar` ADD CONSTRAINT `PrivateCalendar_userKey_fkey` FOREIGN KEY (`userKey`) REFERENCES `User`(`userKey`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_privateCalKey_fkey` FOREIGN KEY (`privateCalKey`) REFERENCES `PrivateCalendar`(`privateCalendarKey`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_plantKey_fkey` FOREIGN KEY (`plantKey`) REFERENCES `Plant`(`plantKey`) ON DELETE SET NULL ON UPDATE CASCADE;

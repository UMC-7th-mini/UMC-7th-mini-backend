/*
  Warnings:

  - You are about to drop the column `memo` on the `PrivateCalendar` table. All the data in the column will be lost.
  - You are about to drop the column `schduleName` on the `PrivateCalendar` table. All the data in the column will be lost.
  - You are about to drop the column `schedule` on the `PrivateCalendar` table. All the data in the column will be lost.
  - The primary key for the `ProjectCalendar` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `memo` on the `ProjectCalendar` table. All the data in the column will be lost.
  - You are about to drop the column `memoKey` on the `ProjectCalendar` table. All the data in the column will be lost.
  - You are about to drop the column `schduleName` on the `ProjectCalendar` table. All the data in the column will be lost.
  - You are about to drop the column `schedule` on the `ProjectCalendar` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `TaskTable` DROP FOREIGN KEY `TaskTable_projectCalendarKey_fkey`;

-- AlterTable
ALTER TABLE `PrivateCalendar` DROP COLUMN `memo`,
    DROP COLUMN `schduleName`,
    DROP COLUMN `schedule`;

-- AlterTable
ALTER TABLE `ProjectCalendar` DROP PRIMARY KEY,
    DROP COLUMN `memo`,
    DROP COLUMN `memoKey`,
    DROP COLUMN `schduleName`,
    DROP COLUMN `schedule`,
    MODIFY `projectKey` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`projectKey`);

-- CreateTable
CREATE TABLE `Schedule` (
    `scheduleKey` INTEGER NOT NULL AUTO_INCREMENT,
    `calendarDate` DATETIME(3) NULL,
    `scheduleDetails` VARCHAR(191) NULL,
    `privateCalKey` INTEGER NULL,
    `projectCalKey` INTEGER NULL,

    PRIMARY KEY (`scheduleKey`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Memo` (
    `memoKey` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NULL,
    `privateCalKey` INTEGER NULL,
    `projectCalKey` INTEGER NULL,

    PRIMARY KEY (`memoKey`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TaskTable` ADD CONSTRAINT `TaskTable_projectCalendarKey_fkey` FOREIGN KEY (`projectCalendarKey`) REFERENCES `ProjectCalendar`(`projectKey`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_privateCalKey_fkey` FOREIGN KEY (`privateCalKey`) REFERENCES `PrivateCalendar`(`privateCalendarKey`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_projectCalKey_fkey` FOREIGN KEY (`projectCalKey`) REFERENCES `ProjectCalendar`(`projectKey`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Memo` ADD CONSTRAINT `Memo_privateCalKey_fkey` FOREIGN KEY (`privateCalKey`) REFERENCES `PrivateCalendar`(`privateCalendarKey`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Memo` ADD CONSTRAINT `Memo_projectCalKey_fkey` FOREIGN KEY (`projectCalKey`) REFERENCES `ProjectCalendar`(`projectKey`) ON DELETE CASCADE ON UPDATE CASCADE;

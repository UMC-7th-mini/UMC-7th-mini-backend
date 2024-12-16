/*
  Warnings:

  - The primary key for the `ProjectCalendar` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `projectCalKey` to the `ProjectCalendar` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Memo` DROP FOREIGN KEY `Memo_projectCalKey_fkey`;

-- DropForeignKey
ALTER TABLE `Schedule` DROP FOREIGN KEY `Schedule_projectCalKey_fkey`;

-- DropForeignKey
ALTER TABLE `TaskTable` DROP FOREIGN KEY `TaskTable_projectCalendarKey_fkey`;

-- AlterTable
ALTER TABLE `ProjectCalendar` DROP PRIMARY KEY,
    ADD COLUMN `projectCalKey` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `projectKey` INTEGER NOT NULL,
    ADD PRIMARY KEY (`projectCalKey`);

-- AddForeignKey
ALTER TABLE `TaskTable` ADD CONSTRAINT `TaskTable_projectCalendarKey_fkey` FOREIGN KEY (`projectCalendarKey`) REFERENCES `ProjectCalendar`(`projectCalKey`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_projectCalKey_fkey` FOREIGN KEY (`projectCalKey`) REFERENCES `ProjectCalendar`(`projectCalKey`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Memo` ADD CONSTRAINT `Memo_projectCalKey_fkey` FOREIGN KEY (`projectCalKey`) REFERENCES `ProjectCalendar`(`projectCalKey`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectCalendar` ADD CONSTRAINT `ProjectCalendar_projectKey_fkey` FOREIGN KEY (`projectKey`) REFERENCES `Project`(`projectKey`) ON DELETE CASCADE ON UPDATE CASCADE;

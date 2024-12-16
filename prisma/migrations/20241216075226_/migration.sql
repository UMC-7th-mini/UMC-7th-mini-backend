-- AlterTable
ALTER TABLE `PrivateCalendar` ADD COLUMN `schduleName` VARCHAR(191) NULL,
    MODIFY `memo` VARCHAR(191) NULL,
    MODIFY `schedule` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `ProjectCalendar` ADD COLUMN `schduleName` VARCHAR(191) NULL;

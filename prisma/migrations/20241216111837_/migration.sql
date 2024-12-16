/*
  Warnings:

  - You are about to drop the column `privateCalKey` on the `ProjectCalendar` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `ProjectCalendar` DROP FOREIGN KEY `ProjectCalendar_privateCalKey_fkey`;

-- AlterTable
ALTER TABLE `ProjectCalendar` DROP COLUMN `privateCalKey`;

-- CreateTable
CREATE TABLE `_UserProjectCalendars` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_UserProjectCalendars_AB_unique`(`A`, `B`),
    INDEX `_UserProjectCalendars_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_UserProjectCalendars` ADD CONSTRAINT `_UserProjectCalendars_A_fkey` FOREIGN KEY (`A`) REFERENCES `PrivateCalendar`(`privateCalendarKey`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserProjectCalendars` ADD CONSTRAINT `_UserProjectCalendars_B_fkey` FOREIGN KEY (`B`) REFERENCES `ProjectCalendar`(`projectCalKey`) ON DELETE CASCADE ON UPDATE CASCADE;

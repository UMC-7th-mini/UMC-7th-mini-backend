/*
  Warnings:

  - You are about to drop the column `memoName` on the `ProjectCalendar` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - Added the required column `memo` to the `PrivateCalendar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schedule` to the `PrivateCalendar` table without a default value. This is not possible if the table is not empty.
  - Made the column `mbti` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `PrivateCalendar` ADD COLUMN `calendarDate` DATETIME(3) NULL,
    ADD COLUMN `memo` VARCHAR(191) NOT NULL,
    ADD COLUMN `schedule` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `ProjectCalendar` DROP COLUMN `memoName`,
    ADD COLUMN `schedule` DATETIME(3) NULL,
    MODIFY `memo` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `role`,
    MODIFY `mbti` ENUM('INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP') NOT NULL;

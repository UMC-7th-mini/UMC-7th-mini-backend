/*
  Warnings:

  - A unique constraint covering the columns `[projectKey]` on the table `ProjectCalendar` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ProjectCalendar_projectKey_key` ON `ProjectCalendar`(`projectKey`);

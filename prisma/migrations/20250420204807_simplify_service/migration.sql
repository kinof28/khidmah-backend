/*
  Warnings:

  - You are about to drop the column `serviceTypeId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the `ServiceType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_serviceTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `ServiceType` DROP FOREIGN KEY `ServiceType_serviceId_fkey`;

-- DropIndex
DROP INDEX `Booking_serviceTypeId_fkey` ON `Booking`;

-- AlterTable
ALTER TABLE `Booking` DROP COLUMN `serviceTypeId`;

-- AlterTable
ALTER TABLE `Service` DROP COLUMN `price`,
    MODIFY `isActive` BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE `ServiceType`;

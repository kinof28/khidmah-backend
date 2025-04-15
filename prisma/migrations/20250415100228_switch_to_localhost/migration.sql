-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title_ar` VARCHAR(191) NOT NULL,
    `title_en` VARCHAR(191) NOT NULL,
    `price` INTEGER NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT false,
    `isRide` BOOLEAN NOT NULL DEFAULT false,
    `image` VARCHAR(191) NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServiceType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title_ar` VARCHAR(191) NOT NULL,
    `title_en` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `serviceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Provider` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `longitude` VARCHAR(191) NOT NULL DEFAULT '',
    `latitude` VARCHAR(191) NOT NULL DEFAULT '',
    `image` VARCHAR(191) NOT NULL DEFAULT '',
    `idImage` LONGBLOB NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `isActive` BOOLEAN NOT NULL DEFAULT false,
    `isBlocked` BOOLEAN NOT NULL DEFAULT false,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Provider_email_key`(`email`),
    UNIQUE INDEX `Provider_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `longitude` VARCHAR(191) NOT NULL DEFAULT '',
    `latitude` VARCHAR(191) NOT NULL DEFAULT '',
    `image` VARCHAR(191) NOT NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `isBlocked` BOOLEAN NOT NULL DEFAULT false,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Customer_email_key`(`email`),
    UNIQUE INDEX `Customer_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER NOT NULL,
    `providerId` INTEGER NOT NULL,
    `serviceId` INTEGER NOT NULL,
    `serviceTypeId` INTEGER NOT NULL,
    `rating` INTEGER NULL,
    `comment` VARCHAR(191) NULL,
    `price` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isConfirmed` BOOLEAN NOT NULL DEFAULT false,
    `isCancelled` BOOLEAN NOT NULL DEFAULT false,
    `isCompleted` BOOLEAN NOT NULL DEFAULT false,
    `isCustomerPaid` BOOLEAN NOT NULL DEFAULT false,
    `isProviderPaid` BOOLEAN NOT NULL DEFAULT false,
    `from_longitude` VARCHAR(191) NOT NULL DEFAULT '',
    `from_latitude` VARCHAR(191) NOT NULL DEFAULT '',
    `to_longitude` VARCHAR(191) NOT NULL DEFAULT '',
    `to_latitude` VARCHAR(191) NOT NULL DEFAULT '',
    `at_longitude` VARCHAR(191) NOT NULL DEFAULT '',
    `at_latitude` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `body` VARCHAR(191) NOT NULL,
    `replied` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProviderToService` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProviderToService_AB_unique`(`A`, `B`),
    INDEX `_ProviderToService_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ServiceType` ADD CONSTRAINT `ServiceType_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_providerId_fkey` FOREIGN KEY (`providerId`) REFERENCES `Provider`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_serviceTypeId_fkey` FOREIGN KEY (`serviceTypeId`) REFERENCES `ServiceType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProviderToService` ADD CONSTRAINT `_ProviderToService_A_fkey` FOREIGN KEY (`A`) REFERENCES `Provider`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProviderToService` ADD CONSTRAINT `_ProviderToService_B_fkey` FOREIGN KEY (`B`) REFERENCES `Service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

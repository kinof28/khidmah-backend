/*
  Warnings:

  - You are about to drop the column `location` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Provider` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Service` table. All the data in the column will be lost.
  - Added the required column `title_ar` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title_en` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "location",
ADD COLUMN     "latitude" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "longitude" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Provider" DROP COLUMN "location",
ADD COLUMN     "latitude" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "longitude" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isRide" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "price" INTEGER,
ADD COLUMN     "title_ar" TEXT NOT NULL,
ADD COLUMN     "title_en" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ServiceType" (
    "id" SERIAL NOT NULL,
    "title_ar" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "serviceId" INTEGER NOT NULL,

    CONSTRAINT "ServiceType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "providerId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "serviceTypeId" INTEGER NOT NULL,
    "rating" INTEGER,
    "comment" TEXT,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "isCancelled" BOOLEAN NOT NULL DEFAULT false,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "isCustomerPaid" BOOLEAN NOT NULL DEFAULT false,
    "isProviderPaid" BOOLEAN NOT NULL DEFAULT false,
    "from_longitude" TEXT NOT NULL DEFAULT '',
    "from_latitude" TEXT NOT NULL DEFAULT '',
    "to_longitude" TEXT NOT NULL DEFAULT '',
    "to_latitude" TEXT NOT NULL DEFAULT '',
    "at_longitude" TEXT NOT NULL DEFAULT '',
    "at_latitude" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ServiceType" ADD CONSTRAINT "ServiceType_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_serviceTypeId_fkey" FOREIGN KEY ("serviceTypeId") REFERENCES "ServiceType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

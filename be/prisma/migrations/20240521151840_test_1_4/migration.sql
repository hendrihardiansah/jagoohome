/*
  Warnings:

  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_paket_id_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_teknisi_id_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_user_id_fkey`;

-- DropTable
DROP TABLE `order`;

-- CreateTable
CREATE TABLE `orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `upload_identity` VARCHAR(191) NULL,
    `kota` VARCHAR(191) NULL,
    `kecamatan` VARCHAR(191) NULL,
    `jalan` VARCHAR(191) NULL,
    `user_id` INTEGER NOT NULL,
    `paket_id` INTEGER NOT NULL,
    `teknisi_id` INTEGER NOT NULL,
    `status_id` VARCHAR(191) NULL,
    `reject_reason` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_paket_id_fkey` FOREIGN KEY (`paket_id`) REFERENCES `paket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_teknisi_id_fkey` FOREIGN KEY (`teknisi_id`) REFERENCES `teknisi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

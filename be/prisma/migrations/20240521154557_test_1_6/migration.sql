-- DropIndex
DROP INDEX `orders_teknisi_id_fkey` ON `orders`;

-- AlterTable
ALTER TABLE `orders` MODIFY `teknisi_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `Paket` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_paket` VARCHAR(191) NULL,
    `harga` VARCHAR(191) NULL,
    `deskripsi` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Teknisi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NULL,
    `nomor_telpon` VARCHAR(191) NULL,
    `nip` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

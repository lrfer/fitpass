-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password_hash` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `birthday` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `personals` (
    `cref` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `personals_cref_key`(`cref`),
    UNIQUE INDEX `personals_userId_key`(`userId`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trainees` (
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `trainees_userId_key`(`userId`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trainings` (
    `id` VARCHAR(191) NOT NULL,
    `traineeUserId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exercises` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `target_muscle` VARCHAR(191) NOT NULL,
    `machine` VARCHAR(191) NOT NULL,
    `comment` VARCHAR(191) NULL,
    `trainingId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `personals` ADD CONSTRAINT `personals_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trainees` ADD CONSTRAINT `trainees_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trainings` ADD CONSTRAINT `trainings_traineeUserId_fkey` FOREIGN KEY (`traineeUserId`) REFERENCES `trainees`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exercises` ADD CONSTRAINT `exercises_trainingId_fkey` FOREIGN KEY (`trainingId`) REFERENCES `trainings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

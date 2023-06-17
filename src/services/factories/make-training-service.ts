import { PrismaTrainingRepository } from "@/repositories/prisma/prisma-training-repository";
import { TrainingService } from "../training-service";

export function makeTrainingService() {
    const trainingRepository = new PrismaTrainingRepository();
    const trainingService = new TrainingService(trainingRepository);
    return trainingService;
}
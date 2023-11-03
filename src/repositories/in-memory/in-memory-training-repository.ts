import { Prisma, Training } from ".prisma/client";
import { TrainingRepository } from "../training-repository";


export class InMemoryTrainingRepository implements TrainingRepository {
    create(trainingData: Prisma.TrainingCreateInput): Promise<Training | null> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<Training | null> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<Training[]> {
        throw new Error("Method not implemented.");
    }
    deleteByUserId(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findByUserId(userId: string): Promise<Training[]> {
        throw new Error("Method not implemented.");
    }
    update(id: string, data: Partial<Prisma.TrainingUpdateInput>): Promise<Training | null> {
        throw new Error("Method not implemented.");
    }
    removeExerciseFromTraining(exerciseId: string, trainingId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}
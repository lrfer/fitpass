import { Prisma, Training, Exercise} from '@prisma/client';

export interface TrainingRepository {
    create(trainingData: Prisma.TrainingCreateInput): Promise<Training>;
    findById(id: string): Promise<Training | null>;
    getAll(): Promise<Training[]>;
}
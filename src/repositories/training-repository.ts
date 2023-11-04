import { Prisma, Training } from '@prisma/client';

export interface TrainingRepository {
	create(
		trainingData: Prisma.TrainingUncheckedCreateInput
	): Promise<Training | null>;
	findById(id: string): Promise<Training | null>;
	getAll(): Promise<Training[]>;
	deleteByUserId(id: string): Promise<void>;
	deleteById(id: string): Promise<void>;
	findByUserId(userId: string): Promise<Training[]>;
	update(
		id: string,
		data: Partial<Prisma.TrainingUpdateInput>
	): Promise<Training | null>;
	removeExerciseFromTraining(
		exerciseId: string,
		trainingId: string
	): Promise<void>;
}

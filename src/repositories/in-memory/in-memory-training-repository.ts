import { Exercise } from '@prisma/client';
import { Prisma, Training } from '.prisma/client';
import { TrainingRepository } from '../training-repository';
import { as } from 'vitest/dist/reporters-5f784f42';

export class InMemoryTrainingRepository implements TrainingRepository {
	public trs: Training[] = [];

	async create(
		trainingData: Prisma.TrainingUncheckedCreateInput
	): Promise<Training> {
		const training: Training = {
			userId: trainingData.userId,
			id: '1',
		};

		this.trs.push(training);

		return training;
	}
	async findById(id: string): Promise<Training> {
		return this.trs.find((tr) => tr.id === id) as Training;
	}
	async getAll(): Promise<Training[]> {
		return this.trs;
	}
	async deleteByUserId(id: string): Promise<void> {
		var training = this.trs.findIndex((tr) => tr.userId === id);
		this.trs.splice(training, 1);
	}
	async deleteById(id: string): Promise<void> {
		var training = this.trs.findIndex((tr) => tr.id === id);
		this.trs.splice(training, 1);
	}
	async findByUserId(userId: string): Promise<Training[]> {
		return this.trs.filter((x) => x.userId === userId);
	}
	async update(
		id: string,
		data: Partial<Prisma.TrainingUpdateInput>
	): Promise<Training> {
		throw new Error('Method not implemented.');
	}
	removeExerciseFromTraining(
		exerciseId: string,
		trainingId: string
	): Promise<void> {
		throw new Error('Method not implemented.');
	}
}

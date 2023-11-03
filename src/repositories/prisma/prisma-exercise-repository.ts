import { prisma } from '@/lib/prisma';
import { Exercise, Prisma } from '@prisma/client';
import { ExercisesRepository } from '../exercise-repository';

export class PrismaExerciseRepository implements ExercisesRepository {
	async create(data: Prisma.ExerciseCreateInput): Promise<Exercise> {
		const exercise = await prisma.exercise.create({
			data,
		});
		return exercise;
	}
	async getAll(): Promise<Exercise[]> {
		const exercises = await prisma.exercise.findMany();
		return exercises;
	}
	async get(id: string): Promise<Exercise> {
		const exercise = await prisma.exercise.findUnique({
			where: {
				id,
			},
		});
		if (!exercise) {
			return {} as Exercise;
		}

		return exercise;
	}
	async delete(id: string): Promise<Exercise> {
		const exercise = await prisma.exercise.delete({
			where: {
				id,
			},
		});
		return exercise;
	}
	async update(
		id: string,
		data: Prisma.ExerciseUpdateInput
	): Promise<Exercise> {
		const exercise = await prisma.exercise.update({
			where: {
				id,
			},
			data,
		});
		return exercise;
	}
}

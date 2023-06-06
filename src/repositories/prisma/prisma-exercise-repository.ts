import { prisma } from '@/lib/prisma';
import { Exercise, Prisma} from '@prisma/client';
import { ExercisesRepository } from '../exercise-repository';

export class PrismaExerciseRepository implements ExercisesRepository  {
	async create(data: Prisma.ExerciseCreateInput): Promise<Exercise> {
		const exercise = await prisma.exercise.create({
			data,
		});
		return exercise;
	}
}

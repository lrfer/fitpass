import { Prisma, Exercise } from '@prisma/client';
import { ExercisesRepository } from '../exercise-repository';
import { as } from 'vitest/dist/reporters-5f784f42';

export class InMemoryExerciseRepository implements ExercisesRepository {
	exercises: Exercise[] = [];
	async create(data: Prisma.ExerciseCreateInput): Promise<Exercise> {
		const exercise: Exercise = {
			id: data.id || '1',
			name: data.name,
			target_muscle: data.target_muscle,
			machine: data.machine,
			comment: data.comment || '',
			reps: data.reps,
			sets: data.sets,
			restTime: data.restTime,
		};
		this.exercises.push(exercise);
		return exercise;
	}
	async getAll(): Promise<Exercise[]> {
		return this.exercises;
	}
	async get(id: string): Promise<Exercise> {
		return this.exercises.find(
			(exercise) => exercise.id === id
		) as Exercise;
	}
	async delete(id: string): Promise<Exercise> {
		return this.exercises.find(
			(exercise) => exercise.id === id
		) as Exercise;
	}
	async update(
		id: string,
		data: Prisma.ExerciseUpdateInput
	): Promise<Exercise> {
		return this.exercises.find((exercise) => exercise.id == id) as Exercise;
	}
}

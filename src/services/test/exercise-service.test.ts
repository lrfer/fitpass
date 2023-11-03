import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { ExerciseService } from '../exercise-service';
import { ExercisesRepository } from '@/repositories/exercise-repository';
import { InMemoryExerciseRepository } from '@/repositories/in-memory/in-memory-excercise-repository';

describe('ExerciseService', () => {
	let exerciseService: ExerciseService;
	let exerciseRepository: ExercisesRepository;

	beforeEach(() => {
		exerciseRepository = new InMemoryExerciseRepository();
		exerciseService = new ExerciseService(exerciseRepository);
	});

	describe('createExercise', () => {
		it('should create a new exercise', async () => {
			const request = {
				name: 'Peck Deck',
				target_muscle: 'Chest',
				description: '',
				machine: 'Peck Deck',
				reps: 10,
				sets: 3,
				restTime: 60,
			};
			const exercise = await exerciseService.createExercise(request);
			expect(exercise).toHaveProperty('id');
			expect(exercise.name).toBe(request.name);
		});
	});

	describe('getAllExercises', () => {
		it('should return all exercises', async () => {
			const request = {
				name: 'Peck Deck',
				target_muscle: 'Chest',
				description: '',
				machine: 'Peck Deck',
				reps: 10,
				sets: 3,
				restTime: 60,
			};
			await exerciseService.createExercise(request);
			const exercises = await exerciseService.getAllExercises();
			expect(exercises).toHaveLength(1);
		});
	});

	describe('getExercise', () => {
		it('should return an exercise by id', async () => {
			const request = {
				id: 'exercise-id',
				name: 'Peck Deck',
				target_muscle: 'Chest',
				description: '',
				machine: 'Peck Deck',
				reps: 10,
				sets: 3,
				restTime: 60,
			};
			await exerciseService.createExercise(request);
			const exercise = await exerciseService.getExercise('exercise-id');
			expect(exercise).toHaveProperty('id', 'exercise-id');
		});
	});

	describe('deleteExercise', () => {
		it('should delete an exercise by id', async () => {
			const request = {
				id: 'exercise-id',
				name: 'Peck Deck',
				target_muscle: 'Chest',
				description: '',
				machine: 'Peck Deck',
				reps: 10,
				sets: 3,
				restTime: 60,
			};
			await exerciseService.createExercise(request);

			const exercise = await exerciseService.deleteExercise(
				'exercise-id'
			);
			expect(exercise).toHaveProperty('id', 'exercise-id');
		});
	});
});

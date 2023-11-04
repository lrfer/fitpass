import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TrainingService } from '../training-service';
import { TrainingRepository } from '@/repositories/training-repository';
import { InMemoryExerciseRepository } from '@/repositories/in-memory/in-memory-excercise-repository';
import { InMemoryTrainingRepository } from '@/repositories/in-memory/in-memory-training-repository';

describe('Training Service', () => {
	let trainingService: TrainingService;
	let trainingRepository: TrainingRepository;

	beforeEach(() => {
		trainingRepository = new InMemoryTrainingRepository();
		trainingService = new TrainingService(trainingRepository);
	});

	describe('create', () => {
		it('should create a new training', async () => {
			const request = {
				userId: '1',
				exerciseIds: ['1', '2', '3'],
			};

			const training = await trainingService.create(request);

			expect(training).not.toBe(null);
			expect(training?.id).not.toBe(null);
			expect(training?.userId).toBe(request.userId);
		});

		it('should throw an error if the repository throws an error', async () => {
			vi.spyOn(trainingRepository, 'create').mockRejectedValueOnce(
				new Error('Failed to create training')
			);

			const request = {
				userId: '1',
				exerciseIds: ['1', '2', '3'],
			};

			await expect(trainingService.create(request)).rejects.toThrow(
				'Não foi possível processar sua solicitação.'
			);
		});
	});

	describe('getTraning', () => {
		it('should return a training by id', async () => {
			const request = {
				userId: '1',
				exerciseIds: ['1', '2', '3'],
			};

			const createdTraining = await trainingService.create(request);

			const training = await trainingService.getTraning(
				createdTraining?.id || ''
			);

			expect(training).not.toBe(null);
			expect(training?.id).toBe(createdTraining?.id);
			expect(training?.userId).toBe(request.userId);
		});

		it('should return null if the training is not found', async () => {
			const training = await trainingService.getTraning('invalid-id');

			expect(training).toBe(undefined);
		});

		it('should throw an error if the repository throws an error', async () => {
			vi.spyOn(trainingRepository, 'findById').mockRejectedValueOnce(
				new Error('Failed to find training')
			);

			await expect(
				trainingService.getTraning('invalid-id')
			).rejects.toThrow('Erro ao buscar o treino');
		});
	});

	describe('getAll', () => {
		it('should return all trainings', async () => {
			const request1 = {
				userId: '1',
				exerciseIds: ['1', '2', '3'],
			};

			const request2 = {
				userId: '2',
				exerciseIds: ['4', '5', '6'],
			};

			await trainingService.create(request1);
			await trainingService.create(request2);

			const trainings = await trainingService.getAll();

			expect(trainings).not.toBe(null);
			expect(trainings?.length).toBe(2);
		});

		it('should return an empty array if there are no trainings', async () => {
			const trainings = await trainingService.getAll();

			expect(trainings).toEqual([]);
		});

		it('should throw an error if the repository throws an error', async () => {
			vi.spyOn(trainingRepository, 'getAll').mockRejectedValueOnce(
				new Error('Failed to get trainings')
			);

			await expect(trainingService.getAll()).rejects.toThrow(
				'Erro ao criar o treinamento'
			);
		});
	});
});

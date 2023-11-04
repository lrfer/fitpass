import { UserService } from '../user-service';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { hash } from 'bcryptjs';
import { TrainingRepository } from '@/repositories/training-repository';
import { UsersRepository } from '@/repositories/users-repository';
import { compare } from 'bcryptjs';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { InMemoryTrainingRepository } from '@/repositories/in-memory/in-memory-training-repository';
import { UserAlreadyExistError } from '../errors/user-already-exist-error';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';
import { User } from '@prisma/client';

describe('UserService', () => {
	let userService: UserService;
	let usersRepository: UsersRepository;
	let trainingRepository: TrainingRepository;

	beforeEach(() => {
		usersRepository = new InMemoryUserRepository();
		trainingRepository = new InMemoryTrainingRepository();
		userService = new UserService(usersRepository, trainingRepository);
	});

	describe('createUser', () => {
		it('should create a new user', async () => {
			const createUserRequest = {
				name: 'John Doe',
				email: 'johndoe@example.com',
				password: 'password',
				phone: '1234567890',
				birthday: new Date('1990-01-01'),
			};

			const user = await userService.createUser(createUserRequest);

			const isPasswordCorrect = await compare(
				createUserRequest.password,
				user.user.password_hash
			);

			expect(isPasswordCorrect).toBe(true);
		});

		it('should throw UserAlreadyExistError if user with same email already exists', async () => {
			const user = {
				id: '1',
				name: 'John Doe',
				email: 'johndoe@example.com',
				password: 'password',
				phone: '1234567890',
				birthday: new Date('1990-01-01'),
			};
			const userReturn = {
				id: '1',
				name: 'John Doe',
				email: 'johndoe@example.com',
				phone: '1234567890',
				birthday: new Date('1990-01-01'),
			};

			vi.spyOn(usersRepository, 'findByEmail').mockResolvedValueOnce(
				userReturn as User
			);
			await expect(userService.createUser(user)).rejects.toThrow(
				UserAlreadyExistError
			);
		});
	});

	describe('update', () => {
		it('should update user with given id', async () => {
			const id = '1';
			const data = { name: 'Jane Doe', email: 'janedoe@example.com' };

			const createUserRequest = {
				id: id,
				name: 'John Doe',
				email: 'johndoe@example.com',
				password: 'password',
				phone: '1234567890',
				birthday: new Date('1990-01-01'),
			};

			await userService.createUser(createUserRequest);
			const user = await userService.update(id, data);

			expect(user).toContain({
				id,
				name: 'Jane Doe',
				email: 'janedoe@example.com',
			});
		});

		it('should throw error if update fails', async () => {
			const id = '1';
			const data = { name: 'Jane Doe' };

			vi.spyOn(usersRepository, 'update').mockRejectedValueOnce(
				new Error('Update failed')
			);

			await expect(userService.update(id, data)).rejects.toThrow(Error);
		});
	});

	describe('getUserByEmail', () => {
		it('should return user with given email', async () => {
			const email = 'johndoe@example.com';

			vi.spyOn(usersRepository, 'findByEmail').mockResolvedValueOnce({
				id: '1',
				name: 'John Doe',
				email,
				password_hash: 'password_hash',
				phone: '1234567890',
				birthday: new Date('1990-01-01'),
			} as User);

			const user = await userService.getUserByEmail(email);

			expect(user).toEqual({
				id: '1',
				name: 'John Doe',
				email,
				password_hash: 'password_hash',
				phone: '1234567890',
				birthday: new Date('1990-01-01'),
			});
		});

		it('should throw InvalidCredentialsError if user with given email does not exist', async () => {
			const email = 'johndoe@example.com';

			vi.spyOn(usersRepository, 'findByEmail').mockResolvedValueOnce(
				null
			);

			await expect(userService.getUserByEmail(email)).rejects.toThrow(
				InvalidCredentialsError
			);
		});
	});

	describe('getUserById', () => {
		it('should return user with given id', async () => {
			const id = '1';

			vi.spyOn(usersRepository, 'findById').mockResolvedValueOnce({
				id,
				name: 'John Doe',
				email: 'johndoe@example.com',
				password_hash: 'password_hash',
				phone: '1234567890',
				birthday: new Date('1990-01-01'),
			} as User);

			const user = await userService.getUserById(id);

			expect(user).toEqual({
				id,
				name: 'John Doe',
				email: 'johndoe@example.com',
				password_hash: 'password_hash',
				phone: '1234567890',
				birthday: new Date('1990-01-01'),
			});
		});

		it('should throw InvalidCredentialsError if user with given id does not exist', async () => {
			const id = '1';

			vi.spyOn(usersRepository, 'findById').mockResolvedValueOnce(null);

			await expect(userService.getUserById(id)).rejects.toThrow(
				InvalidCredentialsError
			);
		});
	});

	describe('deleteByEmail', () => {
		it('should delete user and their trainings with given email', async () => {
			const email = 'johndoe@example.com';
			const user = {
				id: '1',
				name: 'John Doe',
				email,
				password_hash: 'password_hash',
				phone: '1234567890',
				birthday: new Date('1990-01-01'),
			};

			vi.spyOn(userService, 'getUserByEmail').mockResolvedValueOnce(
				user as User
			);
			vi.spyOn(
				trainingRepository,
				'deleteByUserId'
			).mockResolvedValueOnce(undefined);
			// vi.spyOn(usersRepository, 'deleteByEmail').mockResolvedValueOnce(undefined);

			const consoleSpy = vi
				.spyOn(console, 'log')
				.mockImplementationOnce(() => {});

			await userService.deleteByEmail(email);

			expect(consoleSpy).toHaveBeenCalledWith(
				'Usuário e treinamentos excluídos com sucesso.'
			);
		});

		it('should throw error if getUserByEmail throws error', async () => {
			const email = 'johndoe@example.com';

			vi.spyOn(userService, 'getUserByEmail').mockRejectedValueOnce(
				new Error('getUserByEmail failed')
			);

			await expect(userService.deleteByEmail(email)).rejects.toThrow(
				Error
			);
		});

		it('should throw error if deleteByUserId throws error', async () => {
			const email = 'johndoe@example.com';
			const user = {
				id: '1',
				name: 'John Doe',
				email,
				password_hash: 'password_hash',
				phone: '1234567890',
				birthday: new Date('1990-01-01'),
			};

			vi.spyOn(userService, 'getUserByEmail').mockResolvedValueOnce(
				user as User
			);
			vi.spyOn(
				trainingRepository,
				'deleteByUserId'
			).mockRejectedValueOnce(new Error('deleteByUserId failed'));

			await expect(userService.deleteByEmail(email)).rejects.toThrow(
				Error
			);
		});

		it('should throw error if deleteByEmail throws error', async () => {
			const email = 'johndoe@example.com';
			const user = {
				id: '1',
				name: 'John Doe',
				email,
				password_hash: 'password_hash',
				phone: '1234567890',
				birthday: new Date('1990-01-01'),
			};

			var t = user as User;

			vi.spyOn(userService, 'getUserByEmail').mockResolvedValueOnce(
				user as User
			);
			vi.spyOn(
				trainingRepository,
				'deleteByUserId'
			).mockResolvedValueOnce(undefined);
			vi.spyOn(usersRepository, 'deleteByEmail').mockRejectedValueOnce(
				new Error('deleteByEmail failed')
			);

			await expect(userService.deleteByEmail(email)).rejects.toThrow(
				Error
			);
		});
	});
});

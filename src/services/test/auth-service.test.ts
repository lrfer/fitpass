import { AuthService } from '../auth-service';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { UsersRepository } from '@/repositories/users-repository';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';
import { hash } from 'bcryptjs';
import { User } from '@prisma/client';

describe('AuthService', () => {
	let authService: AuthService;
	let usersRepository: UsersRepository;

	beforeEach(() => {
		usersRepository = new InMemoryUserRepository();
		authService = new AuthService(usersRepository);
	});

	describe('authUser', () => {
		it('should authenticate user with correct credentials', async () => {
			const email = 'johndoe@example.com';
			const password = 'password';
			const hashedPassword = await hash(password, 10);

			const user = {
				id: '1',
				name: 'John Doe',
				email,
				password_hash: hashedPassword,
				phone: '1234567890',
				birthday: new Date('1990-01-01'),
			};

			vi.spyOn(usersRepository, 'findByEmail').mockResolvedValueOnce(
				user as User
			);

			const authRequest = { email, password };
			const authResponse = await authService.authUser(authRequest);

			expect(authResponse.user).toEqual(user);
		});

		it('should throw InvalidCredentialsError if user with given email does not exist', async () => {
			const email = 'johndoe@example.com';
			const password = 'password';

			vi.spyOn(usersRepository, 'findByEmail').mockResolvedValueOnce(
				null
			);

			const authRequest = { email, password };
			await expect(authService.authUser(authRequest)).rejects.toThrow(
				InvalidCredentialsError
			);
		});

		it('should throw InvalidCredentialsError if password is incorrect', async () => {
			const email = 'johndoe@example.com';
			const password = 'password';
			const hashedPassword = await hash('wrongpassword', 10);

			const user = {
				id: '1',
				name: 'John Doe',
				email,
				password_hash: hashedPassword,
				phone: '1234567890',
				birthday: new Date('1990-01-01'),
			};

			vi.spyOn(usersRepository, 'findByEmail').mockResolvedValueOnce(
				user as User
			);

			const authRequest = { email, password };
			await expect(authService.authUser(authRequest)).rejects.toThrow(
				InvalidCredentialsError
			);
		});
	});
});

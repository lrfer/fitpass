import { hash } from 'bcryptjs';
import { Prisma, User } from '@prisma/client';
import { UsersRepository } from '@/repositories/users-repository';
import { TrainingRepository } from '@/repositories/training-repository';
import { UserAlreadyExistError } from './errors/user-already-exist-error';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

interface CreateUserRequest {
	name: string;
	email: string;
	password: string;
	phone: string;
	birthday: Date;
}

export class UserService {
	constructor(private usersRepository: UsersRepository,
		private trainingRepository: TrainingRepository) { }

	async createUser({
		name,
		email,
		password,
		phone,
		birthday,
	}: CreateUserRequest) {
		const userWithSameEmail = await this.usersRepository.findByEmail(email);

		if (userWithSameEmail) {
			throw new UserAlreadyExistError();
		}

		const password_hash = await hash(password, 6);

		await this.usersRepository.create({
			name,
			email,
			password_hash,
			phone,
			birthday,
		});
	}

	async update(id: string, data: Prisma.UserUpdateInput): Promise<User | null> {
		try {
			const user = await this.usersRepository.update(id, data);
			return user;
		} catch (error) {
			console.error(error);
			throw error;
		}

	}

	async getUserByEmail(email: string) {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new InvalidCredentialsError();
		}

		return user;
	}

	async getUserById(id: string) {
		const user = await this.usersRepository.findById(id);

		if (!user) {
			throw new InvalidCredentialsError();
		}

		return user;
	}

	async deleteByEmail(email: string) {
		try {

			const user = await this.getUserByEmail(email);
			const userId = user.id;

			console.log(userId);

			await this.trainingRepository.deleteByUserId(userId);
			await this.usersRepository.deleteByEmail(email);

			console.log('Usuário e treinamentos excluídos com sucesso.');
		} catch (error) {
			throw new Error('Erro ao excluir o usuário e treinamentos pelo email');
		}
	}

}

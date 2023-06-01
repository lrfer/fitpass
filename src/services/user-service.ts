import { hash } from 'bcryptjs';
import { UsersRepository } from '@/repositories/users-repository';
import { UserAlreadyExistError } from './errors/user-already-exist-error';

interface CreateUserRequest {
	name: string;
	email: string;
	password: string;
	phone: string;
	birthday: Date;
}

export class UserService {
	constructor(private usersRepository: UsersRepository) {}
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
}

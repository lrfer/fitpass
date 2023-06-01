import { compare } from 'bcryptjs';
import { UsersRepository } from '@/repositories/users-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { User } from '@prisma/client';

interface AuthRequest {
	email: string;
	password: string;
}

interface AuthResponse {
	user: User;
}

export class AuthService {
	constructor(private usersRepository: UsersRepository) {}

	async authUser({ email, password }: AuthRequest): Promise<AuthResponse> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new InvalidCredentialsError();
		}

		const doesPasswordMatches = await compare(password, user.password_hash);

		if (!doesPasswordMatches) {
			throw new InvalidCredentialsError();
		}

		return { user };
	}
}

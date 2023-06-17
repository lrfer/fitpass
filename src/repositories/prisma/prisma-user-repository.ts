import { prisma } from '@/lib/prisma';
import { Prisma, User } from '@prisma/client';
import { UsersRepository } from '../users-repository';
import { InvalidCredentialsError } from '../../services/errors/invalid-credentials-error';

export class PrismaUserRepository implements UsersRepository {
	async findByEmail(email: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		return user;
	}
	async create(data: Prisma.UserUncheckedCreateInput): Promise<User> {
		const user = await prisma.user.create({
			data,
		});
		return user;
	}

	async deleteByEmail(email: string): Promise<User | null> {
		const user = await prisma.user.findUnique({ where: { email } });
	
		if (!user) {
			throw new InvalidCredentialsError();
		}
	
		await prisma.user.delete({ where: { id: user.id } });
	
		return user;
	  }
}

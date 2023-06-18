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

	async findById(id: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				id,
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

		const userId = user.id;

		await prisma.user.delete({ where: { id: userId } });

		return user;
	}

	async update(id: string, data: Prisma.UserUpdateInput): Promise<User | null> {
		try {
			console.log(id);
			const user = await prisma.user.update({
				where: {
					id
				},
				data,
			});
			return user;
		} catch (error) {
			console.error(error);
			throw new Error("Erro processar solicitação.");
		}
	}
}

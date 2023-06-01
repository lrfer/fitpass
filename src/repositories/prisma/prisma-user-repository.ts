import { prisma } from '@/lib/prisma';
import { Prisma, User } from '@prisma/client';
import { UsersRepository } from '../users-repository';

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
}

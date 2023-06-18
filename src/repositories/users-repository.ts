import { Prisma, User } from '@prisma/client';

export interface UsersRepository {
	create(data: Prisma.UserUncheckedCreateInput): Promise<User>;
	findByEmail(email: string): Promise<User | null>;
	findById(id: string): Promise<User | null>;
	deleteByEmail(email: string): Promise<User | null>;
	update(id: string, data: Prisma.UserUpdateInput): Promise<User | null>;
}

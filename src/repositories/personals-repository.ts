import { Prisma, Personal } from '@prisma/client';

export interface PersonalRepository {
	create(data: Prisma.UserUncheckedCreateInput): Promise<Personal>;
	findById(id: string): Promise<Personal | null>;
	deleteByUserId(id: string): Promise<Personal | null>;
}

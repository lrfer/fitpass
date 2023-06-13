import { Prisma, Trainee } from '@prisma/client';

export interface TraineeRepository {
	create(data: Prisma.UserUncheckedCreateInput): Promise<Trainee>;
	findById(id: string): Promise<Trainee | null>;
	deleteByUserId(id: string): Promise<Trainee | null>;
}

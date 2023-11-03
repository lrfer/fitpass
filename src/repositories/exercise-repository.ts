import { Prisma, Exercise } from '@prisma/client';

export interface ExercisesRepository {
	create(data: Prisma.ExerciseCreateInput): Promise<Exercise>;
	getAll(): Promise<Exercise[]>;
	get(id: string): Promise<Exercise>;
	delete(id: string): Promise<Exercise>;
	update(id: string, data: Prisma.ExerciseUpdateInput): Promise<Exercise>;
}

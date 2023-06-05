import { Prisma, Exercise } from '@prisma/client';

export interface ExercisesRepository {
	create(data: Prisma.ExerciseCreateInput): Promise<Exercise>;
	
}

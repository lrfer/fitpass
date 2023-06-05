import { ExercisesRepository } from "@/repositories/exercise-repository"
import { Exercise } from "@prisma/client"


interface CreateExerciseRequest {
    id?: string
    name: string
    target_muscle: string
    machine: string
    comment?: string | null
}

export class ExerciseService {
    constructor(private exerciseRepository: ExercisesRepository) {}

    async createExercise(request: CreateExerciseRequest): Promise<Exercise> {
        const exercise = await this.exerciseRepository.create(request);
        return exercise;
    }

}
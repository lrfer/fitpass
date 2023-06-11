import { ExercisesRepository } from "@/repositories/exercise-repository"
import { Exercise } from "@prisma/client"


interface CreateExerciseRequest {
    id?: string
    name: string
    target_muscle: string
    machine: string
    comment?: string | null
    reps: number
    sets: number
    restTime: number
}

export class ExerciseService {
    constructor(private exerciseRepository: ExercisesRepository) {}

    async createExercise(request: CreateExerciseRequest): Promise<Exercise> {
        const exercise = await this.exerciseRepository.create(request);
        return exercise;
    }

    async getAllExercises(): Promise<Exercise[]> {
        const exercises = await this.exerciseRepository.getAll();
        return exercises;
    }

    async getExercise(id: string): Promise<Exercise> {
        const exercise = await this.exerciseRepository.get(id);
        return exercise;
    }

    async deleteExercise(id: string): Promise<Exercise> {
        const exercise = await this.exerciseRepository.delete(id);
        return exercise;
    }

    async updateExercise(id: string, request: CreateExerciseRequest): Promise<Exercise> {
        const exercise = await this.exerciseRepository.update(id, request);
        return exercise;
    }

}
import { PrismaExerciseRepository } from "@/repositories/prisma/prisma-exercise-repository";
import { ExerciseService } from "../exercise-service";

export function makeExerciseService() {
    const exerciseRepository = new PrismaExerciseRepository();
    const exerciseService = new ExerciseService(exerciseRepository);
    return exerciseService;
}
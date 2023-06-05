import { makeExerciseService } from "@/services/factories/make-exercise-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { type } from "os";
import { z } from "zod";

export async function createExercise(request: FastifyRequest, reply: FastifyReply) {
    const createExerciseBodySchema = z.object({
        name: z.string(),
        target_muscle: z.string(),
        machine: z.string(),
        comment: z.string(),
    });

    const { name, target_muscle, machine, comment } = createExerciseBodySchema.parse(
        request.body
    );

    try {
        const exerciseService = makeExerciseService();

        await exerciseService.createExercise({
            name,
            target_muscle,
            machine,
            comment,
        });

        return reply.status(201).send();
    } catch (err) { 
        throw err;
    }
}
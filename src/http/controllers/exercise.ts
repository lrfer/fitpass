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
        reps: z.number(),
        sets: z.number(),
        restTime: z.number(),
    });

    const { name, target_muscle, machine, comment, reps,sets, restTime } = createExerciseBodySchema.parse(
        request.body
    );

    try {
        const exerciseService = makeExerciseService();

        await exerciseService.createExercise({
            name,
            target_muscle,
            machine,
            comment,
            reps,
            sets,
            restTime,
        });

        return reply.status(201).send();
    } catch (err) { 
        throw err;
    }
}

export async function getAllExercises(request: FastifyRequest, reply: FastifyReply) {
    try {
        const exerciseService = makeExerciseService();

        const exercises = await exerciseService.getAllExercises();

        return reply.status(200).send(exercises);
    } catch (err) {
        console.log(err);
        throw err;
    }
}


export async function deleteExercise(request: FastifyRequest, reply: FastifyReply) {
    const deleteExerciseBodySchema = z.object({
        id: z.string(),
    });

    const { id } = deleteExerciseBodySchema.parse(request.body);

    try {
        const exerciseService = makeExerciseService();

        await exerciseService.deleteExercise(id);

        return reply.status(200).send();
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function updateExercise(request: FastifyRequest, reply: FastifyReply) {
    const updateExerciseBodySchema = z.object({
        id: z.string(),
        name: z.string(),
        target_muscle: z.string(),
        machine: z.string(),
        comment: z.string(),
        reps: z.number(),
        sets: z.number(),
        restTime: z.number(),
    });

    const { id, name, target_muscle, machine, comment, reps, sets, restTime } = updateExerciseBodySchema.parse(
        request.body
    );

    try {
        const exerciseService = makeExerciseService();

        await exerciseService.updateExercise(id, {
            name,
            target_muscle,
            machine,
            comment,
            reps,
            sets,
            restTime,
        });

        return reply.status(200).send();
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function getExercise(request: FastifyRequest, reply: FastifyReply) {
    const getExerciseParamsSchema = z.object({
        id: z.string(),
    });

    const id = getExerciseParamsSchema.parse(request.params).id;

    try {
      const exerciseService = makeExerciseService();
      const exercise = await exerciseService.getExercise(id);
  
      return reply.status(200).send(exercise);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
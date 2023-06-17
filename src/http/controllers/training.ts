import { Prisma, Exercise } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeTrainingService } from "@/services/factories/make-training-service";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    try {
        const trainingService = makeTrainingService();

        const createTrainingBodySchema = z.object({
            userId: z.string(),
            exercises: z.array(
                z.object({
                    exerciseId: z.string(),
                })
            ),
        });

        type TrainingDataSchema = z.infer<typeof createTrainingBodySchema>;

        const { userId, exercises } = createTrainingBodySchema.parse(request.body);

        const trainingData = {
            users: {
                connect: { id: userId },
            },
            ExerciseOnTrainig: {
                createMany: {
                    data: exercises.map((exercise) => ({
                        exerciseId: exercise.exerciseId,
                    })),
                },
            },
        };

        const training = await trainingService.create(trainingData);
        return reply.status(200).send(training);
    } catch (err) {
        console.error("Error", err);
    }
}

export async function getTraining(request: FastifyRequest, reply: FastifyReply) {
    try {
        const trainingService = makeTrainingService();

        const createTrainingBodySchema = z.object({
            id: z.string(),
        });

        type TrainingDataSchema = z.infer<typeof createTrainingBodySchema>;

        const { id } = createTrainingBodySchema.parse(request.params);

        const training = await trainingService.getTraning(id);
        return reply.status(200).send(training);
    } catch (err) {
        console.error("Error", err);
    }
}

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
        const trainingService = makeTrainingService();
        const training = await trainingService.getAll();
        return reply.status(200).send(training);
    } catch (err) {
        console.error("Error", err);
    }
}

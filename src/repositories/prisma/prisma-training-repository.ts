import { prisma } from '@/lib/prisma';
import { Prisma, Training, Exercise } from '@prisma/client';
import { TrainingRepository } from '../training-repository'
import { InvalidCredentialsError } from '../../services/errors/invalid-credentials-error';

export class PrismaTrainingRepository implements TrainingRepository {
  async create(trainingData: Prisma.TrainingCreateInput): Promise<Training> {
    const treinamento = await prisma.training.create({
      data: trainingData,
    });
    return treinamento;
  }

  async findById(id: string): Promise<Training | null> {
    const training = await prisma.training.findUnique({
      where: {
        id,
      },
    });
    return training;
  }

  async getAll(): Promise<Training[]> {
		const exercises = await prisma.training.findMany();
		return exercises;
	}
}
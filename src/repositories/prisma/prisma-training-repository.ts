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
      include: {
        ExerciseOnTrainig: true
      }
    });
    return training;
  }

  async getAll(): Promise<Training[]> {
    const trainings = await prisma.training.findMany({
      include: {
        ExerciseOnTrainig: true
      }
    });
    return trainings;
  }

  async findByUserId(userId: string): Promise<Training[]> {
    const trainings = await prisma.training.findMany({
      where: {
        userId: userId
      }
    });

    return trainings;
  }

  async deleteByUserId(userId: string): Promise<void> {
    try {

      await prisma.exerciseOnTrainig.deleteMany({
        where: {
          training: {
            userId: userId
          }
        }
      });

      await prisma.training.deleteMany({
        where: {
          userId: userId
        }
      });

    } catch (error) {
      console.error(error)
      throw new Error('Erro ao excluir os treinamentos pelo userId');
    }
  }

  async deleteById(id: string): Promise<void> {
    try {

      console.log(id);

      await prisma.exerciseOnTrainig.deleteMany({
        where: {
          training: {
            id: id
          }
        }
      });

      await prisma.training.deleteMany({
        where: {
          id: id
        }
      });

    } catch (error) {
      console.error(error)
      throw new Error('Erro ao excluir os treinamentos pelo userId');
    }
  }

  async update(id: string, data: Partial<Prisma.TrainingUpdateInput>): Promise<Training> {
    try {
      const training = await prisma.training.update({
        where: {
          id,
        },
        data,
      });
      return training;
    } catch (error) {
      console.error("Erro ao atualizar o treinamento:", error);
      throw new Error("Erro ao atualizar o treinamento");
    }
  }

  async removeExerciseFromTraining(exerciseId: string, trainingId: string): Promise<void> {
    await prisma.exerciseOnTrainig.deleteMany({
      where: {
        exerciseId,
        trainingId,
      },
    });
  }

}
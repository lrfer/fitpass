import { Prisma, Training } from '@prisma/client';
import { TrainingRepository } from '@/repositories/training-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

export class TrainingService {
  constructor(private trainingRepository: TrainingRepository) {}

  async create(trainingData: Prisma.TrainingCreateInput): Promise<Training | null> {
    try {
      const treinamento = await this.trainingRepository.create(trainingData);
      return treinamento;
    } catch (error) {
      throw new Error('Não foi possível processar sua solicitação.');
    }
  }

  async getTraning(id: string): Promise<Training | null> {
    try {
      const treinamento = await this.trainingRepository.findById(id);

      return treinamento;
    } catch (error) {
      throw new Error('Erro ao buscar o treino');
    }
  }

  async getAll(): Promise<Training[] | null> {
    try {
      const treinamento = await this.trainingRepository.getAll();
      return treinamento;
    } catch (error) {
      throw new Error('Erro ao criar o treinamento');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.trainingRepository.deleteById(id);
    } catch (error) {
      throw new Error('Erro ao deletar o treinamento');
    }
  }

  async update(id: string, data: Prisma.TrainingUpdateInput): Promise<Training | null> {
    try {
      const training = await this.trainingRepository.update(id, data);
      return training;
    } catch (error) {
      console.error(error);
      throw new Error('Não foi possível processar sua solicitação.');
    }
  }

  async removeExerciseFromTraining(exerciseId: string, trainingId: string): Promise<void> {
    try {
      await this.trainingRepository.removeExerciseFromTraining(exerciseId, trainingId);
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao alterar o treinamento');
    }
  }
}

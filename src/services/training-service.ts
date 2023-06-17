import { Prisma, Training } from '@prisma/client';
import { TrainingRepository } from '@/repositories/training-repository';

export class TrainingService {
  constructor(private trainingRepository: TrainingRepository) {}

  async create(trainingData: Prisma.TrainingCreateInput): Promise<Training> {
    try {
      const treinamento = await this.trainingRepository.create(trainingData);
      return treinamento;
    } catch (error) {
      throw new Error('Erro ao criar o treinamento');
    }
  }

  async getTraning(id: string): Promise<Training | null> {
    try {
      const treinamento = await this.trainingRepository.findById(id);
      return treinamento;
    } catch (error) {
      throw new Error('Erro ao criar o treinamento');
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
}

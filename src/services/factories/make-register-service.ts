import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { PrismaTrainingRepository } from '@/repositories/prisma/prisma-training-repository';
import { UserService } from '../user-service';

export function makeUserService() {
	const userRepository = new PrismaUserRepository();
	const trainingRepository = new PrismaTrainingRepository();
	const userService = new UserService(userRepository, trainingRepository);

	return userService;
}

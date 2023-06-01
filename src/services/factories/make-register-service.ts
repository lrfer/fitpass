import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { UserService } from '../user-service';

export function makeUserService() {
	const userRepository = new PrismaUserRepository();
	const userService = new UserService(userRepository);

	return userService;
}

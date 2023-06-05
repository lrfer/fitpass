import { FastifyInstance } from 'fastify';
import { register } from './controllers/user';
import { authenticate } from './controllers/authenticate';
import { createExercise } from './controllers/exercise';

export async function appRoutes(app: FastifyInstance) {
	app.post('/user/create', register);
	app.post('/user/login', authenticate);
	app.post('/exercise/create', createExercise)
}

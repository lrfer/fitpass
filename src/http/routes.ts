import { FastifyInstance } from 'fastify';
import { register } from './controllers/user';
import { authenticate } from './controllers/authenticate';

export async function appRoutes(app: FastifyInstance) {
	app.post('/user/create', register);
	app.post('/user/login', authenticate);
}

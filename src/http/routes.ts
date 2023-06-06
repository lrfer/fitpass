import { FastifyInstance } from 'fastify';
import { register, getUsers, deleteUser } from './controllers/user';
import { authenticate } from './controllers/authenticate';

export async function appRoutes(app: FastifyInstance) {
	app.post('/user/create', register);
	app.get('/users', getUsers);
	app.delete('/users/:email', deleteUser);

	app.post('/user/login', authenticate);
}

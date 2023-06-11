import { FastifyInstance } from 'fastify';
import { register } from './controllers/user';
import { authenticate } from './controllers/authenticate';
import { createExercise, deleteExercise, getAllExercises, getExercise, updateExercise } from './controllers/exercise';

export async function appRoutes(app: FastifyInstance) {
	app.post('/user/create', register);
	app.post('/user/login', authenticate);
	app.post('/exercise/create', createExercise)
	app.get('/exercise/getAll', getAllExercises)
	app.get('/exercise/get/:id', getExercise)
	app.delete('/exercise/delete', deleteExercise)
	app.put('/exercise/update', updateExercise)
}

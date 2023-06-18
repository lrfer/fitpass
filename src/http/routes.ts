import { FastifyInstance } from 'fastify';
import { register, getUsers, deleteUser } from './controllers/user';
import { create, getTraining, getAll, deleteTraining, updateTraining, removeExerciseFromTraining } from './controllers/training';
import { authenticate } from './controllers/authenticate';
import { createExercise, deleteExercise, getAllExercises, getExercise, updateExercise } from './controllers/exercise';

export async function appRoutes(app: FastifyInstance) {
	app.post('/user/create', register);
	app.get('/users', getUsers);
	app.delete('/users/:email', deleteUser);

	app.post('/user/login', authenticate);
	app.post('/exercise/create', createExercise)
	app.get('/exercise/getAll', getAllExercises)
	app.get('/exercise/get/:id', getExercise)
	app.delete('/exercise/delete', deleteExercise)
	app.put('/exercise/update', updateExercise)

	// Routes Training
	app.post('/training', create);
	app.get('/training/:id', getTraining);
	app.get('/training', getAll);
	app.delete('/training/:id', deleteTraining);
	app.put('/training', updateTraining);
	app.post('/training/removeExercises', removeExerciseFromTraining);
}

import { UserAlreadyExistError } from '@/services/errors/user-already-exist-error';
import { makeUserService } from '@/services/factories/make-register-service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function register(request: FastifyRequest, reply: FastifyReply) {
	const registerBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6),
		phone: z.string(),
		birthday: z.coerce.date(),
	});

	type RegisterBodySchema = z.infer<typeof registerBodySchema>;

	const { name, email, password, phone, birthday } = registerBodySchema.parse(
		request.body
	);

	try {
		const userService = makeUserService();

		await userService.createUser({
			name,
			email,
			password,
			phone,
			birthday,
		});

		return reply.status(201).send();
	} catch (err) {
		if (err instanceof UserAlreadyExistError) {
			return reply.status(400).send({ message: err.message });
		}
		throw err;
	}
}

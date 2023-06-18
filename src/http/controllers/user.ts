import { UserAlreadyExistError } from '@/services/errors/user-already-exist-error';
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error';
import { makeUserService } from '@/services/factories/make-register-service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { hash } from 'bcryptjs';

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

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
	const registerBodySchema = z.object({
		id: z.string(),
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6),
		phone: z.string(),
		birthday: z.coerce.date(),
	});

	const { id, name, email, password, phone, birthday } = registerBodySchema.parse(
		request.body
	);

	try {
		const userService = makeUserService();

		const userResult = await userService.getUserById(id);

		const password_hash = await hash(password, 6);

		const user = {
			name,
			email,
			password_hash,
			phone,
			birthday,
		};

		const userUpdate = await userService.update(userResult.id, user);

		return reply.status(200).send(userUpdate);
	} catch (err) {
		if (err instanceof UserAlreadyExistError) {
			return reply.status(400).send({ message: err.message });
		}
		throw err;
	}
}

export async function getUsers(request: FastifyRequest, reply: FastifyReply) {
	const registerBodySchema = z.object({
		email: z.string().email(),
		name: z.string()
	});

	const { email, name } = registerBodySchema.parse(
		request.query
	);

	try {

		const userService = makeUserService();

		const user = await userService.getUserByEmail(email);

		return user;
	} catch (err) {
		if (err instanceof InvalidCredentialsError) {
			return reply.status(400).send({ message: err.message });
		}
		throw err;
	}
}

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
	const registerBodySchema = z.object({
		email: z.string().email()
	});

	const { email } = registerBodySchema.parse(
		request.params
	);

	try {
		const userService = makeUserService();

		await userService.deleteByEmail(email);

		return reply.status(204).send();
	} catch (err) {
		if (err instanceof InvalidCredentialsError) {
			return reply.status(400).send({ message: err.message });
		}
		console.error("Error", err);
	}
}
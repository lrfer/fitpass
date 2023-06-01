import '@fastify/jwt';

declare module '@fastify/jwt' {
	export interface FastifyJWT {
		user: {
			id: number;
			name: string;
			age: number;
			sub: string;
		};
	}
}

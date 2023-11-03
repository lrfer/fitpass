import { Prisma, User } from '.prisma/client';
import { UsersRepository } from '../users-repository';
import { U } from 'vitest/dist/reporters-5f784f42';

export class InMemoryUserRepository implements UsersRepository {
	public users: User[] = [];

	async create(data: Prisma.UserUncheckedCreateInput): Promise<User> {
		const user: User = {
			id: data.id || '1',
			name: data.name,
			email: data.email,
			password_hash: data.password_hash,
			phone: data.phone,
			birthday: new Date(),
			created_at: new Date(),
		};
		this.users.push(user);
		return user;
	}
	async findByEmail(email: string): Promise<User> {
		const user = this.users.findIndex((user) => user.email === email);
		return this.users[user];
	}
	async findById(id: string): Promise<User> {
		var found = this.users.findIndex((user) => user.id === id);
		return this.users[found];
	}
	async deleteByEmail(email: string): Promise<User> {
		return this.users.find((user) => user.email === email) as User;
	}
	async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
		var user = this.users.findIndex((user) => user.id === id);

		let newUser: User = {
			id: (data.id || this.users[user].id) as string,
			name: (data.name || this.users[user].name) as string,
			email: (data.email || this.users[user].email) as string,
			password_hash: (data.password_hash ||
				this.users[user].password_hash) as string,
			phone: (data.phone || this.users[user].phone) as string,
			birthday: (data.birthday || this.users[user].birthday) as Date,
			created_at: (data.created_at ||
				this.users[user].created_at) as Date,
		};

		this.users[user] = newUser;

		return newUser;
	}
}

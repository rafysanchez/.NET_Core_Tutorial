import { v4 as uuid } from 'uuid';
import { mockDatabase } from '../../../database/mockDatabase';
import { User } from '../user.entity';
import { IUsersRepository } from './users.repository';

export class InMemoryUsersRepository implements IUsersRepository {
  private users: User[];

  constructor() {
    this.users = mockDatabase.users;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const now = new Date();
    const newUser: User = { ...user, id: uuid(), createdAt: now, updatedAt: now };
    this.users.push(newUser);
    return newUser;
  }
}

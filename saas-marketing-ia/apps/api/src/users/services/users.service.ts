import { Injectable } from '@nestjs/common';

// Mock user database - replace with Prisma in production
const users: any[] = [];

@Injectable()
export class UsersService {
  async findByEmail(email: string) {
    return users.find((user) => user.email === email);
  }

  async findById(id: number) {
    return users.find((user) => user.id === id);
  }

  async create(data: any) {
    const user = {
      id: users.length + 1,
      ...data,
      role: 'user',
      createdAt: new Date(),
    };
    users.push(user);
    return user;
  }

  async findAll() {
    return users.map(({ password, ...user }) => user);
  }
}

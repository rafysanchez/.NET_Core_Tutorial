import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../../../config/env';
import { IUsersRepository } from '../repositories/users.repository';
import { LoginInput, RegisterInput } from '../dtos/authSchemas';
import { User } from '../user.entity';

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export class AuthService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async register(data: RegisterInput): Promise<User> {
    const existingUser = await this.usersRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.usersRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
    });

    return user;
  }

  async login(data: LoginInput): Promise<AuthTokens & { user: User }> {
    const user = await this.usersRepository.findByEmail(data.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const payload = { userId: user.id, role: user.role };
    const accessToken = jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
    const refreshToken = jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtRefreshExpiresIn });

    return { accessToken, refreshToken, user };
  }
}

import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { registerSchema, loginSchema } from '../dtos/authSchemas';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (req: Request, res: Response) => {
    const parsed = registerSchema.parse(req.body);
    const user = await this.authService.register(parsed);
    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  };

  login = async (req: Request, res: Response) => {
    const parsed = loginSchema.parse(req.body);
    const { accessToken, refreshToken, user } = await this.authService.login(parsed);
    return res.json({
      accessToken,
      refreshToken,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  };
}

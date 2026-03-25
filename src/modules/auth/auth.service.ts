import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(login: string, password: string, role?: string) {
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.usersService.create(login, hashed, role);
    return this.generateToken(user);
  }

  async login(
    login: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findBylogin(login);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    return {
      access_token: this.jwtService.sign({ sub: user.id, login: user.login }),
    };
  }

  private generateToken(user: any) {
    const payload = { sub: user.id, login: user.login };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

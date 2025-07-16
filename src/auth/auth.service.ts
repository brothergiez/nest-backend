import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

import { LoginRequest, LoginResponse } from './dto/login.dto';
import { RegisterRequest, RegisterResponse } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService
  ) { }

  async login(loginDto: LoginRequest): Promise<LoginResponse> {
    const user = await this.prismaService.user.findUnique({
      where: { email: loginDto.email },
      select: {
        id: true,
        email: true,
        password: true,
        name: true
      }
    });

    if (!user) {
      throw new UnauthorizedException('Username or Password did not match!');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Username or Password did not match!');
    }

    const payload = {
      email: user.email,
      sub: user.id,
      name: user.name
    };

    const token = this.jwtService.sign(payload);

    await this.prismaService.user.update({
      where: { id: user.id },
      data: { token }
    });

    return {
      success: true,
      message: 'Login successful',
      data: { token }
    };
  }

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: data.email }
    });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = bcrypt.hashSync(data.password, 10);
    const user = await this.prismaService.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: 'Registration successful',
      data: {
        id: user.id,
        email: user.email
      },
    };
  }
}

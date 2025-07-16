import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest, LoginResponse } from './dto/login.dto';
import { RegisterRequest, RegisterResponse } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/login')

  async login(
    
    @Body() loginRequest: LoginRequest
  ): Promise<LoginResponse> {
    return this.authService.login(loginRequest)
  }

  @Post('/register')

  async register(
    @Body() registerDto: RegisterRequest
  ): Promise<RegisterResponse> {
    return this.authService.register(registerDto);
  }

}

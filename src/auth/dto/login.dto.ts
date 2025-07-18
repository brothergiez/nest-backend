import * as Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export class LoginRequest {
  static schema = loginSchema;

  email: string;
  password: string;
}

export class LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
  };
}

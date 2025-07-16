import * as Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
});

export class RegisterRequest {
  static schema = registerSchema;

  name: string;
  email: string;
  password: string;
}

export class RegisterResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    email: string;
  };
}

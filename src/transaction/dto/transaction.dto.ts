import * as Joi from 'joi';

export const transactionSchema = Joi.object({
  amount: Joi.string().required(),
});

export class CreateTransactionRequest {
  static schema = transactionSchema;

  amount: string;
}

export const updateTransactionSchema = transactionSchema.keys({
  amount: Joi.string().required(),
});

export class UpdateTransactionRequest {
  static schema = updateTransactionSchema;

  amount: string;
}

export class TransactionResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    amount: string;
    created_at: Date;
    updated_at: Date;
  };
}

import { Controller, Get, UseGuards, Request, Post, Body, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateTransactionRequest } from './dto/transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getTransaction(@Request() req) {
    return this.transactionService.getTransaction(req.user.userId);
  }

  @Post('process')
  @UseGuards(JwtAuthGuard)
  async createTransaction(
    @Request() req,
    @Body() transactionRequest: CreateTransactionRequest
  ) {
    return this.transactionService.createTransaction(
      req.user.userId,
      transactionRequest.amount
    );
  }

  @Post('process/:id')
  @UseGuards(JwtAuthGuard)
  async updateTransaction(
    @Request() req,
    @Param('id') id: string,
    @Body() transactionRequest: CreateTransactionRequest
  ) {
    return this.transactionService.updateTransaction(
      req.user.userId,
      id,
      transactionRequest.amount
    );
  }
}

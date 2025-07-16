import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private prismaService: PrismaService) { }

  async getTransaction(userId: string) {
    const transaction = await this.prismaService.transaction.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' }
    });

    return {
      success: true,
      message: 'Transactions retrieved successfully',
      data: transaction
    }
  }

  async createTransaction(userId: string, amount: string) {
    try {
      const transaction = await this.prismaService.transaction.create({
        data: {
          user_id: userId,
          amount
        }
      });

      return {
        success: true,
        message: 'Transaction created successfully',
        data: transaction,
      }
    } catch (e) {
      throw new BadRequestException('Something when wrong when insert the data');
    }
  }

  async updateTransaction(userId: string, id: string, amount: string) {
    try {
      const transaction = await this.prismaService.transaction.update({
        where: { id, user_id: userId },
        data: { amount },
      });

      return {
        success: true,
        message: 'Transaction updated successfully',
        data: transaction,
      };
    } catch (e) {
      throw new NotFoundException('Transaction not found');
    }
  }
}

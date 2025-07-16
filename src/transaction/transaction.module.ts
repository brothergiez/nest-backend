import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TransactionService } from './transaction.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [TransactionController],
  providers: [
    TransactionService
  ]
})
export class TransactionModule {}

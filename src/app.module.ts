import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TransactionService } from './transaction/transaction.service';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    CommonModule,
    PrismaModule,
    AuthModule,
    TransactionModule
  ],
  controllers: [],
  providers: [
    TransactionService
  ],
})
export class AppModule {}

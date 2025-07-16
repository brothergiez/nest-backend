import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports:[new winston.transports.Console()],
      format: winston.format.json()
      
    })
  ]
})
export class CommonModule {}

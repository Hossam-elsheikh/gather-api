import { Module } from '@nestjs/common';
import { NoorController } from './noor.controller';

@Module({
  controllers: [NoorController]
})
export class NoorModule {}

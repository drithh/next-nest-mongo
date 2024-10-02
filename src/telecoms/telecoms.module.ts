import { Module } from '@nestjs/common';
import { TelecomsService } from './telecoms.service';
import { TelecomsController } from './telecoms.controller';

@Module({
  controllers: [TelecomsController],
  providers: [TelecomsService],
})
export class TelecomsModule {}

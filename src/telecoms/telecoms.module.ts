import { Module } from '@nestjs/common';
import { TelecomsService } from './telecoms.service';
import { TelecomsController } from './telecoms.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Telecom, TelecomSchema } from './schemas/telecom.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Telecom.name, schema: TelecomSchema }]),
  ],
  controllers: [TelecomsController],
  providers: [TelecomsService],
})
export class TelecomsModule {}

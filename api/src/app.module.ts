import { MiddlewareConsumer, Module, NestMiddleware } from '@nestjs/common';
// import { TelecomModule } from './telecoms/telecom.module';
import { TelecomsModule } from './telecoms/telecoms.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { Injectable, OnModuleInit } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    TelecomsModule,
  ],
})
export class AppModule {}

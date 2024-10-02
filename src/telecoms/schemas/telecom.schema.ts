// src/schemas/telecom.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectName } from './object-name.schema';

export type TelecomDocument = Telecom & Document;

@Schema({
  timestamps: true,
})
export class Telecom {
  @Prop({ required: true })
  resultTime: Date;

  @Prop({ required: true })
  granularityPeriod: number;

  @Prop({ required: true, type: ObjectName })
  objectName: ObjectName;

  @Prop({ required: true })
  reliability: number;

  @Prop({ required: true })
  lCellAvailDur: number;

  @Prop({ required: true })
  lCellUnavailDurEnergySaving: number;

  @Prop({ required: true })
  lCellUnavailDurManual: number;

  @Prop({ required: true })
  lCellUnavailDurSys: number;

  @Prop({ required: true })
  lCellUnavailDurSysS1Fail: number;

  @Prop({ required: true })
  lVoiceE2EVQIAcceptTimes: number;

  @Prop({ required: true })
  lVoiceE2EVQIBadTimes: number;

  @Prop({ required: true })
  lVoiceE2EVQIExcellentTimes: number;

  @Prop({ required: true })
  lVoiceE2EVQIGoodTimes: number;

  @Prop({ required: true })
  lVoiceE2EVQIPoorTimes: number;
}

export const TelecomSchema = SchemaFactory.createForClass(Telecom);
TelecomSchema.index(
  { 'objectName.localCellId': 1, 'objectName.eNodeBId': 1 },
  { unique: true },
);

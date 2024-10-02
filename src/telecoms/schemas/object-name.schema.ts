import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ObjectNameDocument = ObjectName & Document;

@Schema()
export class ObjectName {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  functionName: string;

  @Prop({ required: true })
  localCellId: number;

  @Prop({ required: true })
  cellName: string;

  @Prop({ required: true })
  eNodeBId: string;

  @Prop({ required: true })
  cellFddTddIndication: string;
}

export const ObjectNameSchema = SchemaFactory.createForClass(ObjectName);

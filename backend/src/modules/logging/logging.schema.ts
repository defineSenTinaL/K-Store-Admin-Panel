import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Log {
  @Prop()
  level: string;

  @Prop()
  message: string;

  @Prop()
  timestamp: Date;
}

export type LogDocument = Log & Document;
export const LogSchema = SchemaFactory.createForClass(Log);

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log, LogDocument } from './logging.schema';

@Injectable()
export class LoggingService {
  constructor(@InjectModel(Log.name) private logModel: Model<LogDocument>) {}

  async log(level: string, message: string) {
    const logData = {
      level,
      message,
      timestamp: new Date(),
    };
    const log = new this.logModel(logData);
    await log.save();
  }
}

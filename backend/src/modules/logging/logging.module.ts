import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { MongoDB } from 'winston-mongodb';
import { LoggingService } from './logging.service';
import { Log, LogSchema } from './logging.schema';
import { transports } from 'winston';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transports: [
          new transports.Console(),
          new MongoDB({
            level: configService.get<string>('LOG_LEVEL'), // Retrieve log level dynamically from configuration
            db: configService.get<string>('MONGODB_CONNECTION_URL') as string,
            options: {
              useUnifiedTopology: true,
            },
            collection: 'Logs',
          }),
        ],
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LoggingModule {}

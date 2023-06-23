import { Catch, ExceptionFilter, ArgumentsHost, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggingService } from 'src/modules/logging/logging.service';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  protected loggingService: LoggingService;
  constructor(@Inject(LoggingService) loggingService: LoggingService) {
    this.loggingService = loggingService;
  }
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    // Custom error handling logic goes here
    const status = exception.getStatus();
    const errorResponse = {
      timestamp: new Date().toISOString(),
      path: request.url,
      error: exception.message || 'Internal server error',
    };

    const logMessage = `Exception caught: ${JSON.stringify(
      errorResponse,
    )}\n${exception}`;

    this.loggingService.log('error', logMessage);

    response.status(status).json(errorResponse);
  }
}

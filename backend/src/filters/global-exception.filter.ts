import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    // Custom error handling logic goes here
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      timestamp: new Date().toISOString(),
      path: request.url,
      error: exception.message || 'Internal server error',
    };

    const logMessage = `Exception caught: ${JSON.stringify(
      errorResponse,
    )}\n${exception}`;

    response.status(status).json(errorResponse);
  }
}

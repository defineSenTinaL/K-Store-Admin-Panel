import { Catch, ArgumentsHost, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { GlobalExceptionFilter } from './global-exception.filter';
import { CategoryException } from 'src/category/category.exception';

@Catch(CategoryException)
export class CategoryExceptionFilter extends GlobalExceptionFilter {
  catch(exception: CategoryException, host: ArgumentsHost) {
    // Custom error handling logic for products goes here
    // You can add additional handling specific to products
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    // Custom error handling logic for seller goes here
    // You can add additional handling specific to seller

    const status = exception.getStatus();
    const errorResponse = {
      timestamp: new Date().toISOString(),
      path: request.originalUrl,
      error: exception.message || 'Internal server error',
    };

    const logMessage = `Category Exception caught: ${JSON.stringify(
      errorResponse,
    )}\n${exception}`;

    super.catch(exception, host);
  }
}

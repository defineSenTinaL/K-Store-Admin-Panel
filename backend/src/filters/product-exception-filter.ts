import { Catch, ArgumentsHost, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggingService } from 'src/modules/logging/logging.service';
import { GlobalExceptionFilter } from './global-exception.filter';
import { ProductException } from 'src/product/product.exception';

@Catch(ProductException)
export class ProductExceptionFilter extends GlobalExceptionFilter {
  constructor(@Inject(LoggingService) loggingService: LoggingService) {
    super(loggingService);
  }

  catch(exception: ProductException, host: ArgumentsHost) {
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

    const logMessage = `Product Exception caught: ${JSON.stringify(
      errorResponse,
    )}\n${exception}`;

    this.loggingService.log('error', logMessage);
    super.catch(exception, host);
  }
}

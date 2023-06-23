import { HttpStatus } from '@nestjs/common';

export class SellerException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SellerException';
  }

  getStatus(): number {
    return HttpStatus.INTERNAL_SERVER_ERROR; // Replace with the appropriate status code for your exception
  }
}

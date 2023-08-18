// order.controller.ts

import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDocument, OrderStatus } from './order.schema';
import { PaginationDto } from './dto/pagination.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('today-sales')
  async getTotalTodaysSales(): Promise<{ count: number }> {
    const count = await this.orderService.getTotalTodaysSales();
    return { count };
  }

  @Get('count')
  async totalOrders(): Promise<{ count: number }> {
    const count = await this.orderService.totalOrders();
    return { count };
  }

  @Get('pending-orders-count')
  async getPendingOrdersCount(): Promise<{ count: number }> {
    const count = await this.orderService.getPendingOrdersCount();
    return { count };
  }

  @Post()
  async createOrder(
    @Body() orderData: Partial<OrderDocument>,
  ): Promise<OrderDocument[] | null> {
    return this.orderService.createOrder(orderData);
  }

  @Get()
  async getRecentOrders(
    @Query() paginationDto: PaginationDto,
  ): Promise<OrderDocument[] | null> {
    return this.orderService.getRecentOrders(paginationDto);
  }

  @Get('/pending')
  async getPendingOrders(): Promise<OrderDocument[]> {
    const pendingOrders = await this.orderService.getPendingOrders();
    return pendingOrders;
  }

  @Get('return-count')
  async getReturnOrders(): Promise<OrderDocument[]> {
    const returnOrders = await this.orderService.getReturnOrders();
    return returnOrders;
  }

  @Get(':id')
  async getOrderById(
    @Param('id') orderId: string,
  ): Promise<OrderDocument | null> {
    return this.orderService.getOrderById(orderId);
  }

  @Post('confirm-order')
  async confirmOrder(
    @Body()
    body: {
      _id: string;
      order_id: number;
      shipment_id: number;
    },
  ): Promise<OrderDocument | null> {
    const { _id, order_id, shipment_id } = body;
    return this.orderService.confirmOrder(_id, order_id, shipment_id);
  }

  @Post('confirm-pickup/:_id')
  async confirmPickup(
    @Param('_id') _id: string,
    @Body() data: any, // Adjust the type as per your pickup response structure
  ): Promise<OrderDocument | null> {
    try {
      const { manifest_url, label_url, pickupDetail } = data;
      const updatedOrder = await this.orderService.confirmPickup(
        _id,
        pickupDetail,
        manifest_url,
        label_url,
      );
      return updatedOrder;
    } catch (error) {
      // Handle error appropriately
      throw new HttpException(
        'Error confirming pickup',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('status/:id')
  async updateOrderStatus(
    @Param('id') orderId: string,
    @Body('status') status: OrderStatus,
  ): Promise<OrderDocument | null> {
    return this.orderService.updateOrderStatus(orderId, status);
  }

  @Patch('cancel/:id')
  async requestOrderCancellation(
    @Param('id') orderId: string,
    @Body('cancellationReason') cancellationReason: string,
  ): Promise<OrderDocument | null> {
    return this.orderService.requestOrderCancellation(
      orderId,
      cancellationReason,
    );
  }

  @Patch('return/:id')
  async requestOrderReturn(
    @Param('id') _id: string,
    @Body('returnReason') returnReason: string,
  ): Promise<OrderDocument | null> {
    return this.orderService.requestOrderReturn(_id, returnReason);
  }

  @Get('to-be-processed-count')
  async getOrdersToBeProcessedCount(): Promise<number> {
    return this.orderService.getOrdersToBeProcessedCount();
  }

  @Post('accept-return/:_id')
  async acceptReturn(@Param('_id') _id: string) {
    await this.orderService.acceptReturn(_id);
    return { message: 'Return accepted successfully' };
  }

  @Post('reject-return/:_id')
  async rejectReturn(@Param('_id') _id: string) {
    await this.orderService.rejectReturn(_id);
    return { message: 'Return rejected successfully' };
  }

  @Post('return')
  async updateReturn(@Body() updateData: any) {
    try {
      await this.orderService.updateReturn(updateData);
      return { message: 'Return information updated successfully' };
    } catch (error) {
      throw new HttpException(
        'Error confirming pickup',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

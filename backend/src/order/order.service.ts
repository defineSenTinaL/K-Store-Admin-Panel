// order.service.ts

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Order,
  OrderDocument,
  OrderStatus,
  PaymentMethod,
} from './order.schema';
import orderid from 'order-id';
import { Product, ProductDocument } from 'src/product/product.schema';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class OrderService {
  private orderIdGenerator = orderid('12345678');

  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async createOrder(
    orderData: Partial<Order>,
  ): Promise<OrderDocument[] | null> {
    if (!orderData.products || orderData.products.length === 0) {
      throw new BadRequestException('Order must have at least one product.');
    }

    // Create a Mongoose session
    const session = await this.orderModel.db.startSession();
    session.startTransaction();

    try {
      // Common details for all orders
      const {
        userId,
        shippingAddress,
        paymentMethod = PaymentMethod.Online,
        transactionId,
        orderTotal, // Assuming the orderTotal is provided by the client
        discountCoupon,
      } = orderData;

      const orders: OrderDocument[] = [];

      const uniqueOrderId = this.orderIdGenerator.generate();

      // Loop through each product and create an order for it
      for (const product of orderData.products) {
        // Calculate the product's total price
        const productTotal = product.price * product.quantity;

        // Create the order document for this product
        const createdOrder = new this.orderModel({
          userId,
          shippingAddress,
          status: OrderStatus.Placed,
          orderId: uniqueOrderId, // Unique orderId for each product
          products: [product],
          paymentMethod,
          transactionId,
          orderTotal, // Assign the provided orderTotal without calculating
          total: productTotal, // Calculate the total for this product
        });

        // Save the order document for this product and update the product in the same transaction
        await createdOrder.save({ session });

        // Update the product in the Product collection
        const { productId, quantity } = product;
        await this.productModel.updateOne(
          { _id: productId },
          {
            $inc: { sold: quantity, quantity: -quantity },
          },
          { session },
        );

        // Add the created order to the list of orders
        orders.push(createdOrder);
      }

      // If everything is successful, commit the transaction
      await session.commitTransaction();
      session.endSession();

      return orders;
    } catch (error) {
      // If there's an error, abort the transaction
      await session.abortTransaction();
      session.endSession();

      throw error;
    }
  }

  async getRecentOrders(
    paginationDto: PaginationDto,
  ): Promise<OrderDocument[] | null> {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      const orders = await this.orderModel
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate({
          path: 'products.productId', // Populate the products field and access the 'productId' property
          select: 'title', // Select only the 'title' property of the referenced products
        })
        .exec();

      // Custom sorting function based on the order of statuses you want
      const statusOrder = [
        'Placed',
        'Processing',
        'Packed',
        'Delivered',
        'Cancelled',
      ];
      orders.sort(
        (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status),
      );

      return orders;
    } catch (error) {
      const errorMessage = `Error getting recent Orders by pagination (Service): ${error.message}`;
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  }

  async getPendingOrders(): Promise<OrderDocument[]> {
    const orders = await this.orderModel
      .find({ status: 'Placed' })
      .limit(10)
      .populate([
        {
          path: 'products.productId', // Populate the products field and access the 'productId' property
          select: 'title image.url packageDimension packageWeight sku', // Select the 'title' and 'image.url' properties of the referenced products
          options: { limit: 1 }, // Limit to only one product
        },
        {
          path: 'userId', // Populate the userId field to get the user information
          select: 'email', // Select the user's 'username' and 'email'
        },
      ])
      .exec();
    return orders;
  }

  async getReturnOrders(): Promise<OrderDocument[]> {
    const returnOrders = await this.orderModel
      .find({ isReturnRequested: true })
      .limit(10)
      .populate([
        {
          path: 'products.productId', // Populate the products field and access the 'productId' property
          select: 'title image.url packageDimension packageWeight sku', // Select the 'title' and 'image.url' properties of the referenced products
          options: { limit: 1 }, // Limit to only one product
        },
        {
          path: 'userId', // Populate the userId field to get the user information
          select: 'email', // Select the user's 'username' and 'email'
        },
      ])
      .exec();
    return returnOrders;
  }

  async getPendingOrdersCount(): Promise<number> {
    // Query for orders with a specific status (e.g., "Placed")
    const count = await this.orderModel
      .countDocuments({ status: 'Placed' })
      .exec();
    return count;
  }

  async getOrderById(orderId: string): Promise<OrderDocument | null> {
    return this.orderModel.findById(orderId).exec();
  }

  async updateOrderStatus(
    orderId: string,
    status: OrderStatus,
  ): Promise<OrderDocument | null> {
    return this.orderModel
      .findByIdAndUpdate(orderId, { status }, { new: true })
      .exec();
  }

  async requestOrderCancellation(
    orderId: string,
    cancellationReason: string,
  ): Promise<OrderDocument | null> {
    const order = await this.orderModel.findById(orderId).exec();
    if (!order) {
      throw new NotFoundException('Order not found.');
    }

    // Check if the order is eligible for cancellation based on its current status
    // if (order.status !== OrderStatus.OutForDelivery) {
    //   throw new BadRequestException('Order is not eligible for cancellation.');
    // }

    // Update the order status to "Cancelled"
    order.status = OrderStatus.Cancelled;
    order.isCancelled = true;
    order.cancellationReason = cancellationReason;
    order.cancellationDate = new Date();
    return order.save();
  }

  async requestOrderReturn(
    _id: string,
    returnReason: string,
  ): Promise<OrderDocument | null> {
    const order = await this.orderModel.findById(_id).exec();
    if (!order) {
      throw new NotFoundException('Order not found.');
    }

    // Check if the order is eligible for return based on its current status
    // if (order.status !== OrderStatus.Delivered) {
    //   throw new BadRequestException('Order is not eligible for return.');
    // }

    // Check if any product in the order is eligible for return based on the return period
    const today = new Date();
    const returnableProducts = order.products.filter((product) => {
      const returnPeriod = product.returnPeriodInDays;
      const deliveryDate = product.deliveryDate;
      const returnDeadline = new Date(deliveryDate);
      returnDeadline.setDate(returnDeadline.getDate() + returnPeriod);
      return today <= returnDeadline;
    });

    if (returnableProducts.length === 0) {
      throw new BadRequestException(
        'No products in the order are eligible for return.',
      );
    }

    // Update the order's isReturnRequested flag to true and set the returnRequestDate
    order.isReturnRequested = true;
    order.returnRequestDate = new Date();
    order.returnReason = returnReason;
    return order.save();
  }

  async totalOrders(): Promise<number> {
    try {
      // Use the countDocuments method to get the count of orders
      const count = await this.orderModel.countDocuments({});

      return count;
    } catch (error) {
      // Handle any errors that might occur during the process
      throw error;
    }
  }

  async getOrdersToBeProcessedCount(): Promise<number> {
    try {
      const ordersToBeProcessed = await this.orderModel
        .countDocuments({
          status: {
            $in: [
              OrderStatus.Placed,
              OrderStatus.Processing,
              OrderStatus.Packed,
            ],
          },
        })
        .exec();

      return ordersToBeProcessed;
    } catch (error) {
      const errorMessage = `Error getting count of orders to be processed (Service): ${error.message}`;
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  }

  async getTotalTodaysSales(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the start of the day

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Set time to the start of the next day

    const totalSales = await this.orderModel
      .aggregate([
        {
          $match: {
            createdAt: {
              $gte: today,
              $lt: tomorrow,
            },
          },
        },
        {
          $group: {
            _id: null,
            totalSales: {
              $sum: '$totalPriceAfterDiscount',
            },
          },
        },
      ])
      .exec();

    return totalSales.length > 0 ? totalSales[0].totalSales : 0;
  }

  async confirmOrder(
    _id: string,
    order_id: number,
    shipment_id: number,
  ): Promise<OrderDocument | null> {
    return this.orderModel
      .findByIdAndUpdate(
        _id,
        { $set: { order_id, shipment_id } },
        { new: true },
      )
      .exec();
  }

  async confirmPickup(
    _id: string,
    pickupDetail: any,
    manifest_url: string,
    label_url: string,
  ): Promise<OrderDocument | null> {
    return this.orderModel
      .findByIdAndUpdate(
        _id,
        {
          $set: {
            pickupDetail,
            manifest_url,
            label_url,
          },
        },
        { new: true },
      )
      .exec();
  }

  async acceptReturn(_id: string): Promise<void> {
    try {
      const returnId = this.orderIdGenerator.generate(); // Replace with your custom return ID generation logic

      const order = await this.orderModel.findByIdAndUpdate(
        _id,
        { returnAccepted: true, returnId },
        { new: true },
      );

      if (!order) {
        throw new NotFoundException('Order not found');
      }
    } catch (error) {
      throw new NotFoundException('Server Error');
    }
  }

  async rejectReturn(_id: string): Promise<void> {
    try {
      const order = await this.orderModel.findByIdAndUpdate(
        _id,
        { returnRejected: true },
        { new: true },
      );

      if (!order) {
        throw new NotFoundException('Order not found');
      }
    } catch (error) {
      throw new NotFoundException('Server Error');
    }
  }

  async updateReturn(updateData: any): Promise<void> {
    const { _id, return_order_id, return_shipment_id } = updateData;

    const order = await this.orderModel.findByIdAndUpdate(
      _id,
      {
        return_order_id,
        return_shipment_id,
      },
      { new: true },
    );

    if (!order) {
      throw new NotFoundException('Order not found');
    }
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order) private readonly orderRepo: typeof Order) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      return await this.orderRepo.create(createOrderDto);
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to create order.');
    }
  }

  async findAll() {
    try {
      return await this.orderRepo.findAll();
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to retrieve orders.');
    }
  }

  async findOne(id: number) {
    try {
      const order = await this.orderRepo.findByPk(id);
      if (!order) {
        throw new NotFoundException('Order not found.');
      }
      return order;
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to retrieve order.');
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      const [rowsUpdated] = await this.orderRepo.update(updateOrderDto, {
        where: { id },
      });
      if (!rowsUpdated) {
        throw new NotFoundException('Order not found.');
      }
      return { rowsUpdated };
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to update order.');
    }
  }

  async remove(id: number) {
    try {
      const rowsDeleted = await this.orderRepo.destroy({ where: { id } });
      if (!rowsDeleted) {
        throw new NotFoundException('Order not found.');
      }
      return { rowsDeleted };
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to delete order.');
    }
  }
}

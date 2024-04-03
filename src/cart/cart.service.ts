import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart)
    private readonly cartModel: typeof Cart,
  ) {}

  async create(createCartDto: CreateCartDto) {
    try {
      return await this.cartModel.create(createCartDto);
    } catch (error) {
      throw new Error('Failed to create cart.');
    }
  }

  async findAll() {
    try {
      return await this.cartModel.findAll();
    } catch (error) {
      throw new Error('Failed to retrieve carts.');
    }
  }

  async findOne(id: number) {
    try {
      const cart = await this.cartModel.findByPk(id);
      if (!cart) {
        throw new NotFoundException('Cart not found.');
      }
      return cart;
    } catch (error) {
      throw new Error('Failed to retrieve cart.');
    }
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    try {
      const [rowsUpdated] = await this.cartModel.update(updateCartDto, {
        where: { id },
      });
      if (!rowsUpdated) {
        throw new NotFoundException('Cart not found.');
      }
      return { rowsUpdated };
    } catch (error) {
      throw new Error('Failed to update cart.');
    }
  }

  async remove(id: number) {
    try {
      const rowsDeleted = await this.cartModel.destroy({ where: { id } });
      if (!rowsDeleted) {
        throw new NotFoundException('Cart not found.');
      }
      return { rowsDeleted };
    } catch (error) {
      throw new Error('Failed to delete cart.');
    }
  }
}

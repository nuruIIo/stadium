import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IOrderCreationAttr {
  userId: number;
  stadiumTimesId: number;
  date: Date;
  status: string;
}

@Table({ tableName: 'orders' })
export class Order extends Model<Order, IOrderCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'Unique order id',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the user who placed the order',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the stadium time associated with the order',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stadiumTimesId: number;

  @ApiProperty({
    example: '2024-04-15T12:00:00.000Z',
    description: 'Date and time of the order',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date: Date;

  @ApiProperty({
    example: 'pending',
    description: 'Status of the order',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;
}

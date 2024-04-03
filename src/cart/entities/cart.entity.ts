import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ICartCreationAttr {
  userId: number;
  stadiumTimesId: number;
  date: Date;
  time_for_clear: Date;
  status: string;
}

@Table({ tableName: 'cart' })
export class Cart extends Model<Cart, ICartCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'Unique cart id',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the user associated with the cart',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the stadium times associated with the cart',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stadiumTimesId: number;

  @ApiProperty({
    example: '2024-04-01',
    description: 'Date of the cart',
  })
  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  date: Date;

  @ApiProperty({
    example: '2024-04-01T10:00:00Z',
    description: 'Time for clearing the cart',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  time_for_clear: Date;

  @ApiProperty({
    example: 'pending',
    description: 'Status of the cart',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;
}

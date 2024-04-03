import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Stadium } from '../../stadium/entities/stadium.entity';

interface IStadiumTimesCreationAttr {
  stadiumId: number;
  start_time: Date;
  end_time: Date;
  price: number;
}

@Table({ tableName: 'stadium_times' })
export class StadiumTimes extends Model<
  StadiumTimes,
  IStadiumTimesCreationAttr
> {
  @ApiProperty({
    example: 1,
    description: 'Unique ID of the stadium time entry',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the stadium associated with the time entry',
  })
  @ForeignKey(() => Stadium)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stadiumId: number;

  @ApiProperty({
    example: '2024-04-01T08:00:00',
    description: 'Start time of the stadium booking',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  start_time: Date;

  @ApiProperty({
    example: '2024-04-01T10:00:00',
    description: 'End time of the stadium booking',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  end_time: Date;

  @ApiProperty({
    example: 50,
    description: 'Price for booking the stadium for this time slot',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;
}

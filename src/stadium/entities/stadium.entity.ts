import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IStadiumCreationAttr {
  categoryId: number;
  ownerId: number;
  contact_with: string;
  name: string;
  volume: string;
  districtId: number;
  location: string;
  buildAt: string;
  start: Date;
  end: Date;
}

@Table({ tableName: 'stadium' })
export class Stadium extends Model<Stadium, IStadiumCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'Unique stadium id',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'Category id',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  categoryId: number;

  @ApiProperty({
    example: 1,
    description: 'Owner id',
  })
  @Column({
    type: DataType.INTEGER,
  })
  ownerId: number;

  @ApiProperty({
    example: 'John Doe',
    description: 'Contact person name',
  })
  @Column({
    type: DataType.STRING,
  })
  contact_with: string;

  @ApiProperty({
    example: 'Stadium A',
    description: 'Name of the stadium',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'Large',
    description: 'Volume of the stadium',
  })
  @Column({
    type: DataType.STRING,
  })
  volume: string;

  @ApiProperty({
    example: 1,
    description: 'District id',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  districtId: number;

  @ApiProperty({
    example: '123 Main St, City',
    description: 'Location of the stadium',
  })
  @Column({
    type: DataType.STRING,
  })
  location: string;

  @ApiProperty({
    example: '2023-01-01',
    description: 'Date of construction',
  })
  @Column({
    type: DataType.DATE,
  })
  buildAt: string;

  @ApiProperty({
    example: '2023-01-01',
    description: 'Start date of operation',
  })
  @Column({
    type: DataType.DATE,
  })
  start: Date;

  @ApiProperty({
    example: '2023-12-31',
    description: 'End date of operation',
  })
  @Column({
    type: DataType.DATE,
  })
  end: Date;
}

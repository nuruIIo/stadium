import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IUserCreationAttr {
  name: string;
  phone: string;
  email: string;
  password: string;
  tg_link: string;
  photo: string;
  is_owner: boolean;
  is_active: boolean;
  refresh_token: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, IUserCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'Unique user id',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'John Doe',
    description: 'User name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'User phone number',
  })
  @Column({
    type: DataType.STRING,
    // allowNull: false,
  })
  phone: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'User email',
  })
  @Column({
    type: DataType.STRING,
    // allowNull: false,
    // unique: true,
  })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password',
  })
  @Column({
    type: DataType.STRING,
    // allowNull: false,
  })
  password: string;

  @ApiProperty({
    example: 'https://t.me/johndoe',
    description: 'User Telegram link',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  tg_link: string;

  @ApiProperty({
    example: 'https://example.com/johndoe.jpg',
    description: 'User photo URL',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  photo: string;

  @ApiProperty({
    example: true,
    description: 'Indicates whether the user is an owner or not',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    // allowNull: false,
  })
  is_owner: boolean;

  @ApiProperty({
    example: true,
    description: 'Indicates whether the user is active or not',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    // allowNull: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: 'random_refresh_token',
    description: 'User refresh token',
  })
  @Column({
    type: DataType.STRING,
    // allowNull: false,
  })
  refresh_token: string;

  @Column({
    type: DataType.STRING,
  })
  activation_link: string;
}

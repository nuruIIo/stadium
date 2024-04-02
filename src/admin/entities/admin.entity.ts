import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IAdminCreationAttr {
  login: string;
  tg_link: string;
  photo: string;
  password: string;
  is_active: boolean;
  is_creator: boolean;
  token: string;
}

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, IAdminCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'admin ID',
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: 'john_doe',
    description: 'Login username',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  login: string;

  @ApiProperty({
    example: 'https://t.me/johndoe',
    description: 'Telegram link',
  })
  @Column({
    type: DataType.STRING,
  })
  tg_link: string;

  @ApiProperty({
    example: 'https://example.com/photo.jpg',
    description: 'Photo URL',
  })
  @Column({
    type: DataType.STRING,
  })
  photo: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({
    example: true,
    description: 'Flag indicating whether the admin is active',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: false,
    description: 'Flag indicating whether the admin is a creator',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_creator: boolean;

  @ApiProperty({
    example: 'jwt_token',
    description: 'Token for authentication',
  })
  @Column({
    type: DataType.STRING,
  })
  token: string;
}

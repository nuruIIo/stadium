import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Stadium } from '../../stadium/entities/stadium.entity';

interface IMediaCreationAttr {
  stadiumId: number;
  photo: string;
  description: string;
}

@Table({ tableName: 'media' })
export class Media extends Model<Media, IMediaCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'Unique media id',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the stadium associated with the media',
  })
  @ForeignKey(() => Stadium)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stadiumId: number;

  @ApiProperty({
    example: 'https://example.com/photo.jpg',
    description: 'URL of the media (photo)',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  photo: string;

  @ApiProperty({
    example: 'Description of the media',
    description: 'Description of the media content',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;
}

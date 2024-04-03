import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { Stadium } from '../../stadium/entities/stadium.entity';

interface ICommentCreationAttr {
  userId: number;
  stadiumId: number;
  impression: string;
}

@Table({ tableName: 'comments' })
export class Comment extends Model<Comment, ICommentCreationAttr> {
  @ApiProperty({ example: 1, description: 'Unique comment id' })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the user who made the comment',
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the stadium associated with the comment',
  })
  @ForeignKey(() => Stadium)
  @Column({ type: DataType.INTEGER, allowNull: false })
  stadiumId: number;

  @ApiProperty({
    example: 'Positive',
    description: 'Impression of the comment',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  impression: string;
}

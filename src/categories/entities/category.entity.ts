import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

interface ICategoryCreationAttr {
  name: string;
  parentId: number | null; // Nullable parentId
}

@Table({ tableName: 'category' })
export class Category extends Model<Category, ICategoryCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'Unique category id',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'football',
    description: 'Name of the category',
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({
    example: 1,
    description: 'ID of the parent category (if any)',
  })
  @ForeignKey(() => Category) // Define foreign key constraint referencing itself
  @Column({
    type: DataType.INTEGER,
    allowNull: true, // Allow null for top-level categories
  })
  parentId: number | null;
}

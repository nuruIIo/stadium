import { ApiProperty } from '@nestjs/swagger';
import {
    BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Region } from '../../region/entities/region.entity';

interface IDistrictCreationAttr {
  name: string;
  regionId: number;
}

@Table({ tableName: 'district' })
export class District extends Model<District, IDistrictCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'Unique district id',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Manhattan',
    description: 'Name of the district',
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({
    example: 1,
    description: 'ID of the region to which the district belongs',
  })
  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  regionId: number;

//   @BelongsTo(() => Region)
//   region: Region
}

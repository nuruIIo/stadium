import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStadiumTimeDto } from './dto/create-stadium-time.dto';
import { UpdateStadiumTimeDto } from './dto/update-stadium-time.dto';
import { StadiumTimes } from './entities/stadium-time.entity';

@Injectable()
export class StadiumTimesService {
  constructor(
    @InjectModel(StadiumTimes)
    private readonly stadiumTimesModel: typeof StadiumTimes,
  ) {}

  /**
   * Creates a new stadium time.
   * @param createStadiumTimeDto The data to create a stadium time.
   * @returns The created stadium time.
   */
  async create(
    createStadiumTimeDto: CreateStadiumTimeDto,
  ): Promise<StadiumTimes> {
    try {
      return await this.stadiumTimesModel.create(createStadiumTimeDto);
    } catch (error) {
      throw new Error('Failed to create stadium time.');
    }
  }

  /**
   * Retrieves all stadium times.
   * @returns All stadium times.
   */
  async findAll(): Promise<StadiumTimes[]> {
    try {
      return await this.stadiumTimesModel.findAll();
    } catch (error) {
      throw new Error('Failed to retrieve stadium times.');
    }
  }

  /**
   * Retrieves a stadium time by ID.
   * @param id The ID of the stadium time.
   * @returns The found stadium time.
   */
  async findOne(id: number): Promise<StadiumTimes> {
    try {
      const stadiumTime = await this.stadiumTimesModel.findByPk(id);
      if (!stadiumTime) {
        throw new NotFoundException('Stadium time not found.');
      }
      return stadiumTime;
    } catch (error) {
      throw new Error('Failed to retrieve stadium time.');
    }
  }

  /**
   * Updates a stadium time by ID.
   * @param id The ID of the stadium time.
   * @param updateStadiumTimeDto The data to update the stadium time.
   * @returns The updated stadium time.
   */
  async update(
    id: number,
    updateStadiumTimeDto: UpdateStadiumTimeDto,
  ): Promise<StadiumTimes> {
    try {
      const [rowsUpdated, updatedStadiumTime] =
        await this.stadiumTimesModel.update(updateStadiumTimeDto, {
          where: { id },
          returning: true,
        });
      if (!rowsUpdated) {
        throw new NotFoundException('Stadium time not found.');
      }
      return updatedStadiumTime[0];
    } catch (error) {
      throw new Error('Failed to update stadium time.');
    }
  }

  /**
   * Removes a stadium time by ID.
   * @param id The ID of the stadium time to remove.
   * @returns Object containing the number of rows deleted.
   */
  async remove(id: number): Promise<{ rowsDeleted: number }> {
    try {
      const rowsDeleted = await this.stadiumTimesModel.destroy({
        where: { id },
      });
      if (!rowsDeleted) {
        throw new NotFoundException('Stadium time not found.');
      }
      return { rowsDeleted };
    } catch (error) {
      throw new Error('Failed to delete stadium time.');
    }
  }
}

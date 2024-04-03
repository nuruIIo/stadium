import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment)
    private readonly commentModel: typeof Comment,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    return await this.commentModel.create(createCommentDto);
  }

  async findAll(): Promise<Comment[]> {
    return await this.commentModel.findAll();
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentModel.findByPk(id);
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const [rowsUpdated, [updatedComment]] = await this.commentModel.update(
      updateCommentDto,
      {
        where: { id },
        returning: true,
      },
    );
    if (!rowsUpdated) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return updatedComment;
  }

  async remove(id: number): Promise<{ rowsDeleted: number }> {
    const rowsDeleted = await this.commentModel.destroy({ where: { id } });
    if (!rowsDeleted) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return { rowsDeleted };
  }
}

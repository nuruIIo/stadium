import { IsNumber, IsString } from "class-validator"

export class CreateCommentDto {
    @IsNumber()
    userId: number

    @IsNumber()
    stadiumId: number

    @IsString()
    impression: string
}

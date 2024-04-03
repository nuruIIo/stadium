import { IsNumber, IsString } from "class-validator"

export class CreateMediaDto {
    @IsNumber()
    stadiumId: number

    @IsString()
    photo: string

    @IsString()
    description: string
}

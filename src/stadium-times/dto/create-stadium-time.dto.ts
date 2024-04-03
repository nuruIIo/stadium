import { IsNumber } from "class-validator"

export class CreateStadiumTimeDto {
    @IsNumber()
    stadiumId: number
    
    start_time: Date
    end_time: Date
    price: number
}

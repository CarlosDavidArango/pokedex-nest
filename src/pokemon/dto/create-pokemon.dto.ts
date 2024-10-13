
import { IsInt, IsNumber, IsPositive, IsString, MIN, MinLength } from 'class-validator';

export class CreatePokemonDto {

    @IsPositive()
    @IsInt()
    @IsNumber()
    no: number;

    @IsString()
    @MinLength(1)
    name: string;
}

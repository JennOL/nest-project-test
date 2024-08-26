import { PartialType } from "@nestjs/mapped-types";
import { IsOptional, IsString, MinLength } from "class-validator";

export class CreateCarDto{

    @IsString({ message: 'The id must be a string' })
    @IsOptional()
    readonly id:string;

    @IsString({ message: 'The brand must be a string' })
    readonly brand:string;

    @IsString()
    @MinLength(3, { message: 'Model must have min 3 letters'})
    readonly model:string;
}

export class UpdateCarDto extends PartialType(CreateCarDto){}
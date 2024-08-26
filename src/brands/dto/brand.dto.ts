import { PartialType } from "@nestjs/mapped-types";
import { IsOptional, IsString, MinLength } from "class-validator";

export class CreateBrandDto {

    @IsString()
    @IsOptional()
    readonly id: string;

    @IsString()
    @MinLength(3)
    readonly name: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
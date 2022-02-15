import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateUserDTO {
    @IsString()
    @ApiProperty()
    name: string;

    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty()
    password: string;

    @IsString()
    @ApiProperty()
    address: string;
}


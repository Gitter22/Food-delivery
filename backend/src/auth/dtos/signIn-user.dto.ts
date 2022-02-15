import { PickType } from "@nestjs/swagger";
import { CreateUserDTO } from "./create-user.dto";


export class SignInUserDTO extends PickType(CreateUserDTO, ['email', 'password'] as const) { }
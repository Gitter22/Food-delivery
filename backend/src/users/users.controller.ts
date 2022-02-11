import { Controller, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Post('sign-up')
    createUser() {
    }

    @Post('sign-in')
    signIn() {
    }

}


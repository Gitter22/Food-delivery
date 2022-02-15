import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { AuthService } from './auth.service';
import { SignInUserDTO } from './dtos/signIn-user.dto';
import { UsersService } from './users.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private authService: AuthService,
        private userService: UsersService) { }

    @Post('sign-up')
    signUp(@Body() body: CreateUserDTO) {
        return this.authService.signUp(body.name, body.email, body.password, body.address)
    }
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: any) {
        return this.authService.login(req.user);
    }
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}


import { Body, Controller, Get, Post, Request, Session, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { AuthService } from './auth.service';
import { SignInUserDTO } from './dtos/signIn-user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('sign-up')
    signUp(@Body() body: CreateUserDTO) {
        return this.authService.signUp(body.name, body.email, body.password, body.address)
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: any) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}


import { Body, Controller, Get, Header, Post, Request, Session, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { AuthService } from './auth.service';
import { SignInUserDTO } from './dtos/signIn-user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('sign-up')
    signUp(@Body() body: CreateUserDTO) {
        return this.authService.signUp(body.name, body.email, body.password, body.address)
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiBody({ type: SignInUserDTO })
    async login(@Request() req: any) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard, AdminGuard)

    @Get('profile')
    @ApiBearerAuth()
    getProfile(@Request() req) {
        return req.user;
    }
}


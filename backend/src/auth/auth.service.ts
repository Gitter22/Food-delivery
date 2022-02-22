import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async signUp(name: string, email: string, password: string, address: string) {
        const user = await this.usersService.find(email)
        if (user.length) {
            throw new BadRequestException('email is aleady in use')
        }
        const newUser = await this.usersService.create(name, email, password, address)
        const payload = { name: newUser.name, sub: newUser.id, isAdmin: newUser.isAdmin, email: newUser.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async validateUser(email: string, enteredPassword: string) {
        const [user] = await this.usersService.find(email)
        if (!user) {
            return null
        }
        const match = await bcrypt.compare(enteredPassword, user.password)
        if (!match) {
            return null
        }
        const { password, ...result } = user
        return result
    }

    async login(user: User) {
        const payload = { name: user.name, sub: user.id, isAdmin: user.isAdmin, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}

//     async signIn(email: string, password: string) {
//     const [user] = await this.usersService.find(email)
//     if (!user) {
//         throw new NotFoundException('User does not exist')
//     }
//     const match = await bcrypt.compare(password, user.password)
//     if (!match) {
//         throw new BadRequestException("Password incorrect")
//     }
//     return user
// }

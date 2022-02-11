import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    signUp(email, name, address, password) { }

    signIn(email, password) { }
}
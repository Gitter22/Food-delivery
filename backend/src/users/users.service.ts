import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) { }

    async find(email: string) {
        const user = await this.repo.find({ email })
        return user
    }
    async findAll() {
        const users = await this.repo.find()
        return users
    }
    create(name: string, email: string, password: string, address: string) {
        const user = this.repo.create({ name, email, password, address })
        return this.repo.save(user)

    }
}

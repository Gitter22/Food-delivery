import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './auth/auth.module';
import { User } from './users/user.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot({
    type: 'postgres',
    port: 5432,
    username: 'postgres',
    password: '123456',
    database: 'zomato',
    synchronize: true,
    entities: [User]
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }



import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

// TypeOrmModule.forRoot({
//   type: 'postgres',
//   port: 5432,
//   username: 'postgres',
//   password: '123456',
//   database: 'zomato',
//   synchronize: true,
// }
